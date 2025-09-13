/* eslint-disable no-param-reassign */

import { Mutex } from "async-mutex";
import { AxiosInstance } from "axios";
import makeSignature from "@/utils/make-signature";
import { getDecryptedItem } from "../auth/secureStorage";

type CacheKey = `${string}:${string}`;

const signatureMutex = new Mutex();
let hasShownPurposeAlert = false;

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

        const timestamp = Date.now().toString();
        const signature = makeSignature({
          uri: `/v1${uri}`,
          method,
          secretKey,
          deviceId: deviceInfo.deviceId,
          timestamp,
        });

        if (process.env.NODE_ENV === "development") {
          // eslint-disable-next-line no-console
          console.log("🧾 Signing Payload", {
            uri: `/v1${uri}`,
            method,
            secretKey,
            timestamp,
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

  axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
      if (error.response) {
        if (error.response?.status === 401) {
          const meta = JSON.parse(localStorage.getItem("@meta") || "{}");

          const deviceInfo = (await getDecryptedItem({
            key: "@deviceInfo",
            deviceId: meta.deviceId,
            storeId: meta.storeId,
          })) as Device;

          const currentPath = window.location.pathname;
          const pathPurpose = currentPath.split("/")[1];

          const validatePosPurpose =
            deviceInfo.purpose.toLowerCase() === "pos" && pathPurpose === "pos";
          const validateHallPurpose =
            ["hall", "waiting"].includes(deviceInfo.purpose.toLowerCase()) &&
            (pathPurpose === "hall" || pathPurpose === "waiting");

          if (
            validatePosPurpose &&
            validateHallPurpose &&
            !hasShownPurposeAlert
          ) {
            hasShownPurposeAlert = true;
            // eslint-disable-next-line
            alert(
              `${window.location.href.split("/")[3].toUpperCase()} 기기가 아닙니다. 기기를 등록해주세요.`
            );
            setTimeout(() => {
              window.location.href = "/device";
            }, 10);
          }
        } else if (error.response?.status === 404) {
          const customError = new Error("NOT_FOUND");
          (customError as any).code = "NOT_FOUND";
          throw customError;
        }
      }

      return Promise.reject(error);
    }
  );
};
