type SSECategory =
  | "DEVICE"
  | "STORE"
  | "CATEGORY"
  | "MENU"
  | "WAITING"
  | "ORDER"
  | "STAFF_CALL"
  | "RECEIPT"
  | "POS";

type SSEAction = "GET" | "CREATE" | "UPDATE" | "DELETE";

interface SSEResponse {
  storeId: string;
  category: SSECategory;
  action: SSEAction;
  hasData: boolean;
  data: any;
}
