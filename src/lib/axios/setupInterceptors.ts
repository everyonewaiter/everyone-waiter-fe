/* eslint-disable no-underscore-dangle */

import { Mutex } from "async-mutex";
import axios, { AxiosInstance } from "axios";
import { getToken } from "../cookies";
import { getClientCookie } from "../cookies/client";

let refreshPromise: Promise<any> | null = null;
const mutex = new Mutex();

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  // NOTE: 요청 인터셉터
  axiosInstance.interceptors.request.use(async (config) => {
    let token;

    if (typeof window === "undefined") {
      token = await getToken("accessToken");
    } else {
      token = getClientCookie("accessToken");
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
      const originalRequest = error.config as any;

      if (error.response?.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;

        if (refreshPromise) {
          const accessToken = await refreshPromise;
          if (!accessToken) throw error;
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        }

        refreshPromise = mutex.runExclusive(async () => {
          try {
            const res = await axios.post("/api/refresh");

            if (res.status !== 200 || !res.data?.accessToken) {
              if (typeof window !== "undefined") {
                window.location.href = "/logout";
              }
              return null;
            }

            const { accessToken } = await res.data;
            return accessToken;
          } catch (err: any) {
            if (typeof window !== "undefined") {
              window.location.href = "/logout";
            }
            throw err;
          } finally {
            refreshPromise = null;
          }
        });

        const newToken = await refreshPromise;
        if (!newToken) throw error;
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      }

      return Promise.reject(error);
    }
  );
};
