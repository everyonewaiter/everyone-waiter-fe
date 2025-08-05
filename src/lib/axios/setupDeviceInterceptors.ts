/* eslint-disable no-param-reassign */

import { Mutex } from "async-mutex";
import { AxiosInstance } from "axios";
import makeSignature from "@/utils/make-signature";
import { getDecryptedItem } from "../auth/secureStorage";

type CacheKey = `${string}:${string}`;

const signatureMutex = new Mutex();

const signatureCache: Record<
  CacheKey,
  { timestamp: string; signature: string; createdAt: number }
> = {};

const getCacheKey = (method: string, uri: string) =>
  `${method}:${uri}` as const;

export const setupDeviceInterceptors = (axiosInstance: AxiosInstance) => {
  if (typeof window === "undefined") return;

  axiosInstance.interceptors.request.use(async (config) => {
    const method = config.method?.toUpperCase() || "GET";
    const rawUrl = config.url || "/";
    const searchParams = new URLSearchParams(config.params).toString();
    const uri = searchParams ? `${rawUrl}?${searchParams}` : rawUrl;

    // eslint-disable-next-line
    await signatureMutex.runExclusive(async () => {
      const key = getCacheKey(method, `/v1${config.url}`);
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
          return config;
        }

        const { purpose } = deviceInfo;

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

        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.log("🧾 Signing Payload", {
            uri: `/v1${uri}`,
            method,
            secretKey,
            timestamp,
            purpose,
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
        config.headers = config.headers || {};
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
      }

      if (errorMsg !== lastErrorMessage || now - lastErrorTime > 3000) {
        lastErrorMessage = errorMsg;
        lastErrorTime = now;
      }

      return Promise.reject(error);
    }
  );
};
