import { useEffect, useRef } from "react";
import {
  EventSourcePolyfill,
  EventSourcePolyfillInit,
} from "event-source-polyfill";
import API_PATH from "@/lib/api/paths";
import { getDecryptedItem } from "@/lib/auth/secureStorage";
import makeSignature from "@/utils/make-signature";

interface UseSSEProps<T> {
  onMessage: (data: SSEResponse<T>) => void;
  lastEventId?: string;
}

export function useSSE<T>({ onMessage, lastEventId }: UseSSEProps<T>) {
  const eventSourceRef = useRef<EventSourcePolyfill | null>(null);

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

  useEffect(() => {
    let eventSource: EventSourcePolyfill | null = null;
    let mounted = true;

    (async () => {
      const { deviceInfo, signature, timestamp } = await getInfo(
        `${API_PATH.stores}/subscribe`,
        "GET"
      );

      const options: EventSourcePolyfillInit = {
        headers: {
          "x-ew-access-key": deviceInfo.deviceId,
          "x-ew-signature": signature,
          "x-ew-timestamp": timestamp,
          ...(lastEventId ? { "Last-Event-ID": lastEventId } : {}),
        },
        withCredentials: true,
        heartbeatTimeout: 300000,
      };

      const url = `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1${API_PATH.stores}/subscribe`;

      if (!mounted) return;

      eventSource = new EventSourcePolyfill(url, options);
      eventSourceRef.current = eventSource;

      eventSource.addEventListener("sse", (event) => {
        const eventData = (event as MessageEvent).data;

        if (eventData !== "CONNECTED!") {
          try {
            const parsed: SSEResponse<T> = JSON.parse(
              (event as MessageEvent).data
            );
            onMessage(parsed);
          } catch (e) {
            // eslint-disable-next-line no-console
            console.error("SSE parse error:", e, (event as MessageEvent).data);
          }
        }
      });

      // 연결 상태 확인
      eventSource.onopen = () => {
        // eslint-disable-next-line no-console
        console.log("SSE connection opened");
      };
    })();

    return () => {
      mounted = false;
      eventSource?.close();
    };
  }, [lastEventId, onMessage]);
}
