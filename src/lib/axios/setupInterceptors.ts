/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

import { Mutex } from "async-mutex";
import axios, { AxiosInstance } from "axios";
import { getToken, setCookie } from "../cookies";
import { getClientCookie, setClientCookie } from "../cookies/client";

let refreshPromise: Promise<any> | null = null;
const mutex = new Mutex();

const client = axios.create();

const logout = async () => {
  try {
    await client.post("/api/auth/logout", {}, { withCredentials: true });
  } finally {
    window.location.href = "/login";
  }
};

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
      config.headers = config.headers ?? {};
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // NOTE: 응답 인터셉터
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const originalRequest = error.config as any;

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !String(originalRequest?.url || "").includes("/api/refresh")
      ) {
        originalRequest._retry = true;

        if (refreshPromise) {
          const accessToken = await refreshPromise;
          if (!accessToken) throw error;
          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return axiosInstance(originalRequest);
        }

        refreshPromise = mutex.runExclusive(async () => {
          try {
            if (typeof window === "undefined") {
              // SSR
              const res = await fetch("/api/refresh", {
                method: "POST",
                cache: "no-store",
              });
              if (!res.ok) return null;
              const { accessToken } = await res.json().catch(() => {});

              if (!accessToken) {
                await logout();
                return await Promise.reject(error);
              }

              await setCookie("accessToken", accessToken);
              return accessToken;
            }
            // csr

            const res = await client.post(
              "/api/refresh",
              {},
              { withCredentials: true }
            );
            const newToken = res.data?.accessToken;

            if (!newToken) {
              await logout();
              return await Promise.reject(error);
            }

            setClientCookie("accessToken", newToken);
            return newToken;
          } catch (err: any) {
            await logout();
            return null;
          } finally {
            refreshPromise = null;
          }
        });

        const newToken = await refreshPromise;
        if (!newToken) throw error;
        originalRequest.headers = originalRequest.headers ?? {};
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return axiosInstance(originalRequest);
      }

      return Promise.reject(error);
    }
  );
};
