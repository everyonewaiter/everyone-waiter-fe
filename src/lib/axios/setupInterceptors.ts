import { Mutex } from "async-mutex";
import { AxiosInstance } from "axios";
import { renewToken } from "../api/auth.api";
import { getToken, setCookie } from "../cookies";
import { getClientCookie } from "../cookies/client";

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;
const mutex = new Mutex();

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  // NOTE: 요청 인터셉터
  axiosInstance.interceptors.request.use(async (config) => {
    let token;

    if (typeof window === "undefined" || typeof document === "undefined") {
      token = await getToken("accessToken");
    } else {
      token = getClientCookie("client-accessToken");
    }

    if (token) {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // NOTE: 응답 인터셉터
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const e = error as any;
      const originalRequest = error.config as any;

      if (error.response?.status === 401 && !originalRequest.retryFlag) {
        originalRequest.retryFlag = true;

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

            if (process.env.NODE_ENV === "development") {
              // eslint-disable-next-line no-console
              console.log(`refresh ${refreshToken}`);
            }

            if (!refreshToken) throw error;

            const { accessToken } = await renewToken({ refreshToken });

            if (process.env.NODE_ENV === "development") {
              // eslint-disable-next-line no-console
              console.log("refresh: success ✅");
            }

            await setCookie("accessToken", accessToken);
            return accessToken;
          } finally {
            isRefreshing = false;
            refreshPromise = null;
          }
        });

        const accessToken = await refreshPromise;
        originalRequest.headers.Authorization = `Bearer ${accessToken}`;
        return axiosInstance(originalRequest);
      }

      if (error.response?.status === 403) {
        return Promise.reject(error);
      }

      if (error.response?.status === 400) {
        // eslint-disable-next-line no-console
        console.error(e.response.data.message);
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );
};
