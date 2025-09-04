import EventSource from "react-native-sse";
import { getDecryptedItem } from "@/lib/auth/secureStorage";
import makeSignature from "@/utils/make-signature";
import getQueryClient from "@/app/get-query-client";

type SseName = "sse";

export type SseEvent = {
  storeId: string;
  category: keyof SseCategory;
  action: keyof ServerAction;
  hasData: boolean;
  data: string;
};

export type SseCategory = {
  DEVICE: "기기";
  STORE: "매장";
  CATEGORY: "카테고리";
  MENU: "메뉴";
  WAITING: "웨이팅";
  ORDER: "주문";
  STAFF_CALL: "직원 호출";
  RECEIPT: "레시피";
  POS: "POS";
};

export type ServerAction = {
  GET: "조회";
  CREATE: "생성";
  UPDATE: "수정";
  DELETE: "삭제";
};

export class SseService {
  private static REQUEST_METHOD = "GET";
  private static REQUEST_URI = "/v1/stores/subscribe";

  private readonly device: Device | null = null;

  private eventSource: EventSource<SseName> | null = null;
  private secretKey: string = "";
  private timestamp: string = Date.now().toString();
  private timestampInterval: NodeJS.Timeout | null = null;

  constructor(device: Device) {
    this.device = device;
    this.timestampInterval = setInterval(
      () => {
        this.timestamp = Date.now().toString();
      },
      1000 * 60 * 3
    );
  }

  async connect() {
    if (!this.device) {
      throw new Error("Device info not initialized");
    }

    if (!this.secretKey) {
      this.secretKey =
        (await getDecryptedItem<string>({
          key: "@secretKey",
          deviceId: this.device.deviceId,
          storeId: this.device.storeId,
        })) ?? "";
    }

    const url = new URL(
      process.env.NEXT_PUBLIC_API_BASE_URL + SseService.REQUEST_URI
    );

    this.eventSource = new EventSource(url, {
      headers: {
        "x-ew-access-key": {
          toString: () => this.device!.deviceId,
        },
        "x-ew-signature": {
          toString: () =>
            makeSignature({
              deviceId: this.device!.deviceId,
              method: SseService.REQUEST_METHOD,
              uri: SseService.REQUEST_URI,
              secretKey: this.secretKey,
              timestamp: this.timestamp,
            }),
        },
        "x-ew-timestamp": {
          toString: () => this.timestamp,
        },
      },
    });

    this.setEventListener();
  }

  disconnect() {
    if (this.eventSource) {
      this.eventSource.removeAllEventListeners();
      this.eventSource.close();
      this.eventSource = null;
    }

    if (this.timestampInterval) {
      clearInterval(this.timestampInterval);
      this.timestampInterval = null;
    }
  }

  private setEventListener() {
    if (!this.eventSource) {
      return;
    }

    this.eventSource.addEventListener("sse", (event) => {
      if (!event.data || event.data === "CONNECTED!") {
        return;
      }

      const queryClient = getQueryClient();
      const sseEvent: SseEvent = JSON.parse(event.data);

      switch (sseEvent.category) {
        case "DEVICE":
          queryClient.invalidateQueries({
            queryKey: ["get-device-info-with-store"],
          });
          break;
        case "STORE":
          queryClient.invalidateQueries({ queryKey: ["stores"] });
          break;
        case "CATEGORY":
          queryClient.invalidateQueries({ queryKey: ["pos-menu-list"] });
          break;
        case "MENU":
          queryClient.invalidateQueries({ queryKey: ["pos-menu-list"] });
          break;
        case "WAITING":
          queryClient.invalidateQueries({ queryKey: ["waiting-list"] });
          queryClient.invalidateQueries({ queryKey: ["waitings-list"] });
          window.dispatchEvent(new CustomEvent("sse-waiting-notification"));
          break;
        case "ORDER":
          queryClient.invalidateQueries({ queryKey: ["order-list"] });
          window.dispatchEvent(new CustomEvent("sse-order-notification"));
          break;
        case "STAFF_CALL":
          queryClient.invalidateQueries({ queryKey: ["staff-calls"] });
          break;
        case "RECEIPT":
          // TODO: 주방 프린터 연결 상태 확인 후 주방 프린터 출력
          break;
        case "POS":
          queryClient.invalidateQueries({ queryKey: ["table-list"] });
          queryClient.invalidateQueries({ queryKey: ["table"] });
          queryClient.invalidateQueries({ queryKey: ["activity"] });
          break;
        default:
          throw new Error(`Unhandled store action event:${sseEvent}`);
      }
    });
  }
}
