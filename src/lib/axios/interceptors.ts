/* eslint-disable no-param-reassign */

import { Mutex } from "async-mutex";
import { AxiosInstance } from "axios";
import makeSignature from "@/utils/make-signature";
import { deleteCookie, getToken, setCookie } from "../cookies";
import { renewToken } from "../api/auth.api";
import { getSecureItem } from "../auth/localStorage";

const mutex = new Mutex();

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await getToken("accessToken");
      // NOTE - 토큰이 있으면 모든 요청에 토큰 추가
      if (token) {
        // eslint-disable-next-line no-param-reassign
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    // 요청 오류가 있는 작업 수행
    (error) => Promise.reject(error)
  );

  // NOTE - 응답 인터셉터
  axiosInstance.interceptors.response.use(
    //  2xx 범위 상태 코드(성공)
    (response) => response,
    // 2xx 외의 범위 상태 코드(실패)
    async (error) => {
      const originalRequest = error.config as any;

      if (error.response.status === 403) {
        // 필요한 경우 리다이렉트 설정 추가 필요
        return Promise.reject(error);
      }

      if (
        error.response?.status === 401 &&
        !originalRequest.isRetry &&
        !window.location.href.includes("/control")
      ) {
        originalRequest.isRetry = true;

        return mutex.runExclusive(async () => {
          try {
            const refreshToken = await getToken("refreshToken");
            if (!refreshToken) {
              window.location.href = "/login";
              throw error;
            }

            const { accessToken } = await renewToken({ refreshToken });

            if (accessToken) {
              await setCookie("accessToken", accessToken);
              originalRequest.headers.Authorization = `Bearer ${accessToken}`;
              return await axiosInstance(originalRequest);
            }

            return await Promise.reject(error);
          } catch (refreshError: any) {
            const code = refreshError?.response?.data?.code;

            if (["FORBIDDEN", "UNAUTHORIZED"].includes(code)) {
              window.location.href = "/login";
            } else {
              await deleteCookie("accessToken");
              await deleteCookie("refreshToken");
            }

            return Promise.reject(refreshError);
          }
        });
      }

      return Promise.reject(error);
    }
  );
};

export const setupDeviceInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      const deviceInfo = await getSecureItem("deviceInfo");
      const secretKey = await getSecureItem("secretKey");

      if (!deviceInfo || !secretKey) return config;

      const signature = makeSignature({ secretKey, ...deviceInfo });

      if (
        config.url?.startsWith("/stores") &&
        config.method?.toLowerCase() === "post"
      ) {
        config.headers.Authorization = `Bearer ${signature}`;
      } else {
        const timestamp = Date.now().toString();

        config.headers["x-ew-access-key"] = secretKey;
        config.headers["x-ew-signature"] = signature;
        config.headers["x-ew-timestamp"] = timestamp;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );
};
