/* eslint-disable no-underscore-dangle */
/* eslint-disable no-param-reassign */

import { Mutex } from "async-mutex";
import axios, { AxiosInstance } from "axios";
import { getToken } from "../cookies";
import { getClientCookie, setClientCookie } from "../cookies/client";

let refreshPromise: Promise<any> | null = null;
const mutex = new Mutex();

const client = axios.create();

const logout = async () => {
  if (typeof window === "undefined") return;

  try {
    setClientCookie("accessToken", "");
    setClientCookie("refreshToken", "");
    setClientCookie("permission", "");

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

      if (typeof window === "undefined") {
        return Promise.reject(error);
      }

      if (
        error.response?.status === 401 &&
        !originalRequest._retry &&
        !String(originalRequest?.url || "").includes("/api/refresh")
      ) {
        originalRequest._retry = true;

        if (refreshPromise) {
          try {
            const accessToken = await refreshPromise;
            if (!accessToken) throw error;
            originalRequest.headers = originalRequest.headers ?? {};
            originalRequest.headers.Authorization = `Bearer ${accessToken}`;
            return await axiosInstance(originalRequest);
          } catch (refreshError) {
            throw error;
          }
        }

        refreshPromise = mutex.runExclusive(async () => {
          try {
            const res = await client.post(
              "/api/refresh",
              {},
              { withCredentials: true }
            );

            const newToken = res.data?.accessToken;

            if (!newToken) {
              await logout();
              return null;
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

        try {
          const newToken = await refreshPromise;
          if (!newToken) throw error;

          originalRequest.headers = originalRequest.headers ?? {};
          originalRequest.headers.Authorization = `Bearer ${newToken}`;
          return await axiosInstance(originalRequest);
        } catch (refreshError) {
          throw error;
        }
      }

      return Promise.reject(error);
    }
  );
};
