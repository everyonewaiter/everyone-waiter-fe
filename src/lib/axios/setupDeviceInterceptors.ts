import { Mutex } from "async-mutex";
import { AxiosInstance } from "axios";
import makeSignature from "@/utils/make-signature";
import { getDecryptedItem } from "../auth/secureStorage";

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

    // eslint-disable-next-line
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
          return config;
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

        return {
          ...config,
          headers: {
            ...(config.headers || {}),
            "x-ew-access-key": deviceInfo.deviceId,
            "x-ew-signature": signature,
            "x-ew-timestamp": timestamp,
          },
        };
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
