import { Mutex } from "async-mutex";
import { AxiosInstance } from "axios";
import { getToken } from "../cookies";
import { getClientCookie, setClientCookie } from "../cookies/client";
import { renewToken } from "../api/auth.api";

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;
const mutex = new Mutex();

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      let token;
      if (typeof window === "undefined") {
        token = await getToken("accessToken");
      } else {
        token = getClientCookie("accessToken");
      }

      if (token) {
        // eslint-disable-next-line no-param-reassign
        (config.headers as any).Authorization = `Bearer ${token}`;
      }

      return config;
    },
    (error) => Promise.reject(error)
  );

  // NOTE - 응답 인터셉터
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as any;

      if (error.response?.status === 401 && !originalRequest.retryFlag) {
        originalRequest.retryFlag = true;

        // 갱신 중이면 기다림
        if (isRefreshing && refreshPromise) {
          await refreshPromise;
          const token = getClientCookie("accessToken");
          originalRequest.headers.Authorization = `Bearer ${token}`;
          return axiosInstance(originalRequest);
        }

        // 갱신 시작
        isRefreshing = true;
        refreshPromise = mutex.runExclusive(async () => {
          try {
            const refreshToken = getClientCookie("refreshToken");

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

            setClientCookie("accessToken", accessToken);
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
        return Promise.reject(error);
      }

      return Promise.reject(error);
    }
  );
};
