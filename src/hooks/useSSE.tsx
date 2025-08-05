import { useEffect } from "react";
import { EventSourcePolyfill } from "event-source-polyfill";
import API_PATH from "@/lib/api/paths";
import { getDecryptedItem } from "@/lib/auth/secureStorage";
import makeSignature from "@/utils/make-signature";

type SSEHandler = (payload: any) => void;

const getInfo = async (uri: string, method: string) => {
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

  return { deviceInfo, signature, timestamp };
};

export const useSSE = (handlers: Partial<Record<SSECategory, SSEHandler>>) => {
  useEffect(() => {
    let sse: EventSourcePolyfill | null = null;

    (async () => {
      try {
        const { deviceInfo, signature, timestamp } = await getInfo(
          `${API_PATH.stores}/subscribe`,
          "GET"
        );

        sse = new EventSourcePolyfill(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1${API_PATH.stores}/subscribe`,
          {
            headers: {
              "x-ew-access-key": deviceInfo.deviceId,
              "x-ew-signature": signature,
              "x-ew-timestamp": timestamp,
            },
            withCredentials: true,
            heartbeatTimeout: 300000,
          }
        );

        sse.onmessage = (event: any) => {
          try {
            const payload: SSEResponse = JSON.parse(event.data);
            // eslint-disable-next-line no-console
            console.log("SSE 이벤트:", payload);

            if (payload.category && handlers[payload.category]) {
              handlers[payload.category]?.(payload);
            }
          } catch (err) {
            // eslint-disable-next-line no-console
            console.error("SSE 데이터 파싱 실패:", err);
          }
        };

        sse.onerror = (err: any) => {
          // eslint-disable-next-line no-console
          console.error("SSE 연결 에러:", err);
          sse?.close();
        };
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error("SSE 초기화 실패:", err);
      }
    })();

    return () => sse?.close();
  }, [handlers]);
};
