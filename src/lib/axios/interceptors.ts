/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

import { Mutex } from "async-mutex";
import { AxiosInstance } from "axios";
import makeSignature from "@/utils/make-signature";
import { deleteCookie, getToken, setCookie } from "../cookies";
import { renewToken } from "../api/auth.api";
import { getSecureItem } from "../auth/localStorage";

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;
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

      if (error.response?.status === 403) {
        // 필요한 경우 리다이렉트 설정 추가 필요
        return Promise.reject(error);
      }

      if (
        error.response?.status === 401 &&
        !originalRequest._retry
        // ![
        //   "/auth",
        //   "/device",
        //   "/hall",
        //   "/login",
        //   "/pos",
        //   "/signup",
        //   "/waiting",
        // ].some((path) => window.location.pathname.startsWith(path))
      ) {
        originalRequest._retry = true;

        // 갱신 중이면 기다림
        if (isRefreshing && refreshPromise) {
          await refreshPromise;
          const token = await getToken("accessToken");
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        }

        // 갱신 시작
        isRefreshing = true;
        refreshPromise = mutex.runExclusive(async () => {
          try {
            const refreshToken = await getToken("refreshToken");
            console.log(`refresh ${refreshToken}`);
            if (!refreshToken) {
              window.location.href = "/login";
              throw error;
            }

            const { accessToken } = await renewToken({ refreshToken });

            await setCookie("accessToken", accessToken);
            return accessToken;
          } catch (refreshError: any) {
            const code = refreshError?.response?.data?.code;
            if (["FORBIDDEN", "UNAUTHORIZED"].includes(code)) {
              window.location.href = "/login";
            } else {
              await deleteCookie("accessToken");
              await deleteCookie("refreshToken");
            }
            throw refreshError;
          } finally {
            isRefreshing = false;
            refreshPromise = null;
          }
        });

        const accessToken = await refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      }

      return Promise.reject(error);
    }
  );
};

type CacheKey = `${string}:${string}:${string}`;

const signatureMutex = new Mutex();

const signatureCache: Record<
  CacheKey,
  { timestamp: string; signature: string; createdAt: number }
> = {};

const getCacheKey = (method: string, uri: string, purpose: string) =>
  `${method}:${uri}:${purpose}` as const;

export const setupDeviceInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      const method = config.method?.toUpperCase() || "GET";
      const uri = config.url || "/";

      await signatureMutex.runExclusive(async () => {
        const purpose = "HALL";
        const key = getCacheKey(method, `/v1${uri}`, purpose);
        const cached = signatureCache[key];

        if (!cached || Date.now() - cached.createdAt > 1000) {
          const deviceInfo = await getSecureItem("deviceInfo");
          const secretKey = await getSecureItem("secretKey");

          if (!deviceInfo || !secretKey) {
            console.warn("❌ deviceInfo 또는 secretKey가 없습니다.");
            return;
          }

          const timestamp = Date.now().toString();
          const signature = makeSignature({
            uri: `/v1${uri}`,
            method,
            secretKey,
            timestamp,
            purpose,
            name: deviceInfo.name,
            deviceId: deviceInfo.deviceId,
          });

          console.log("🧾 Signing Payload", {
            method,
            uri: `/v1${uri}`,
            secretKey,
            timestamp,
            purpose,
            name: deviceInfo.name,
            deviceId: deviceInfo.deviceId,
          });

          console.log("🧾 Headers", {
            "x-ew-access-key": deviceInfo.deviceId,
            "x-ew-signature": signature,
            "x-ew-timestamp": timestamp,
          });

          config.headers["x-ew-access-key"] = deviceInfo.deviceId;
          config.headers["x-ew-signature"] = signature;
          config.headers["x-ew-timestamp"] = timestamp;
        }
      });

      return config;
    },
    (error) => Promise.reject(error)
  );

  axiosInstance.interceptors.response.use(
    (response) => {
      // 응답 성공 시 처리
      console.log("✅ Axios Response Success:", response);
      return response;
    },
    (error) => {
      // 응답 에러 발생 시 처리
      console.error(
        "❌ Axios Response Error:",
        error.response || error.message || error
      );

      // 에러 응답 데이터 확인
      if (error.response) {
        // 서버가 응답했지만 상태 코드가 2xx 범위가 아닌 경우
        console.error("   Status:", error.response.status);
        console.error("   Data:", error.response.data); // <-- 여기가 에러 응답 데이터
        console.error("   Headers:", error.response.headers);
      } else if (error.request) {
        // 요청이 만들어졌지만 응답을 받지 못한 경우 (예: 네트워크 문제)
        console.error("   No response received for the request.");
        console.error("   Request:", error.request);
      } else {
        // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생한 경우
        console.error("   Error setting up the request:", error.message);
      }

      return Promise.reject(error); // 에러를 다시 throw하여 호출자에게 전달
    }
  );
};
