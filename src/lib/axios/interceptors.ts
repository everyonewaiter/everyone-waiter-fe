/* eslint-disable no-param-reassign */

import { Mutex } from "async-mutex";
import { AxiosInstance } from "axios";
import makeSignature from "@/utils/make-signature";
import { renewToken } from "../api/auth.api";
import { getDecryptedItem } from "../auth/secureStorage";
import { deleteCookie, getToken, setCookie } from "../cookies";

let isRefreshing = false;
let refreshPromise: Promise<any> | null = null;
const mutex = new Mutex();

export const setupInterceptors = (axiosInstance: AxiosInstance) => {
  axiosInstance.interceptors.request.use(
    async (config) => {
      const token = await getToken("accessToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  // NOTE - 응답 인터셉터
  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      const e = error as any;
      const originalRequest = error.config as any;

      if (error.response?.status === 403) {
        return Promise.reject(error);
      }

      if (error.response?.status === 400) {
        // eslint-disable-next-line no-alert
        alert(e.response.data.message);
        return Promise.reject(error);
      }

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

            if (!refreshToken) {
              window.location.href = "/login";
              throw error;
            }

            const { accessToken } = await renewToken({ refreshToken });

            if (process.env.NODE_ENV === "development") {
              // eslint-disable-next-line no-console
              console.log("refresh: success ✅");
            }

            await setCookie("accessToken", accessToken);
            return accessToken;
          } catch (refreshError: any) {
            const code = refreshError?.response?.data?.code;
            if (["FORBIDDEN", "UNAUTHORIZED"].includes(code)) {
              window.location.href = "/login";
            } else {
              await deleteCookie("accessToken");
              await deleteCookie("refreshToken");
              window.location.href = "/login";
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
  if (typeof window === "undefined") return;

  axiosInstance.interceptors.request.use(async (config) => {
    const method = config.method?.toUpperCase() || "GET";
    const rawUrl = config.url || "/";
    const searchParams = new URLSearchParams(config.params).toString();
    const uri = searchParams ? `${rawUrl}?${searchParams}` : rawUrl;

    await signatureMutex.runExclusive(async () => {
      const key = getCacheKey(method, `/v1${uri}`, "POS");
      const cached = signatureCache[key];

      if (!cached || Date.now() - cached.createdAt > 1000) {
        const meta = JSON.parse(localStorage.getItem("@meta") || "{}");

        const deviceInfo = (await getDecryptedItem({
          key: "@deviceInfo",
          deviceId: meta.deviceId,
          storeId: meta.storeId,
        })) as Device;

        const secretKey = (await getDecryptedItem({
          key: "@secretKey",
          deviceId: meta.deviceId,
          storeId: meta.storeId,
        })) as string;

        if (!deviceInfo || !secretKey) {
          // eslint-disable-next-line no-console
          console.warn("❌ deviceInfo 또는 secretKey가 없습니다.");
          return;
        }

        const timestamp = Date.now().toString();
        const signature = makeSignature({
          uri: `/v1${uri}`,
          method,
          secretKey,
          timestamp,
          purpose: deviceInfo.purpose,
          name: deviceInfo.name,
          deviceId: deviceInfo.deviceId,
        });

        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.log("🧾 Signing Payload", {
            method,
            uri: `/v1${uri}`,
            secretKey,
            timestamp,
            purpose: deviceInfo.purpose,
            name: deviceInfo.name,
            deviceId: deviceInfo.deviceId,
          });
          // eslint-disable-next-line no-console
          console.log("🧾 Headers", {
            "x-ew-access-key": deviceInfo.deviceId,
            "x-ew-signature": signature,
            "x-ew-timestamp": timestamp,
          });
        }

        config.headers["x-ew-access-key"] = deviceInfo.deviceId;
        config.headers["x-ew-signature"] = signature;
        config.headers["x-ew-timestamp"] = timestamp;
      }
    });

    return config;
  });

  let lastErrorMessage = "";
  let lastErrorTime = 0;

  axiosInstance.interceptors.response.use(
    (response) => response,
    (error) => {
      const errorMsg =
        error?.response?.data?.message || error.message || "Unknown error";
      const now = Date.now();

      if (error.response) {
        if (error.response?.status === 404) {
          const customError = new Error("NOT_FOUND");
          (customError as any).code = "NOT_FOUND";
          throw customError;
        }
      } else if (error.request) {
        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.error("   ❗ No response received.");
          // eslint-disable-next-line no-console
          console.error("   URL:", error.config?.url);
        }
      } else if (process.env.NODE_ENV === "development") {
        // eslint-disable-next-line no-console
        console.error("   Error setting up the request:", error.message);
      }

      if (errorMsg !== lastErrorMessage || now - lastErrorTime > 3000) {
        // eslint-disable-next-line no-console
        console.error("❌ Axios Response Error:", errorMsg);
        lastErrorMessage = errorMsg;
        lastErrorTime = now;
      }

      return Promise.reject(error);
    }
  );
};
