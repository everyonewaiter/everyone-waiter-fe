import API_PATH from "@/lib/api/paths";
import { signatureInstance } from "@/lib/axios/instance";

export type PropsWithTableNo<T extends object = {}> = T & { tableNo: number };

export const openStore = async () => {
  const response = await signatureInstance.post(`${API_PATH.stores}/open`);
  return response;
};

export const closeStore = async () => {
  const response = await signatureInstance.post(`${API_PATH.stores}/close`);
  return response;
};

export const getStoreStatus = async (): Promise<PosStore> => {
  const response = await signatureInstance.get(`${API_PATH.stores}/status`);
  return response.data;
};

export const getTables = async (): Promise<{ tables: POSTableList[] }> => {
  const response = await signatureInstance.get(`${API_PATH.pos}/tables`);
  return response.data;
};

export const getTableActivity = async ({
  tableNo,
}: PropsWithTableNo): Promise<PosTableActivity> => {
  const response = await signatureInstance.get(
    `${API_PATH.pos}/tables/${tableNo}`
  );
  return response.data;
};

export const moveTables = async ({
  sourceTableNo,
  targetTableNo,
}: {
  sourceTableNo: number;
  targetTableNo: number;
}) => {
  const response = await signatureInstance.post(
    `${API_PATH.pos}/tables/${sourceTableNo}/move/${targetTableNo}`
  );
  return response.data;
};

export const getPosMenuList = async (
  storeId: string
): Promise<{ categories: PosMenuData[] }> => {
  const response = await signatureInstance.get(
    `${API_PATH.stores}/${storeId}/menus`
  );
  return response.data;
};

export const resendReceiptKitchen = async ({ tableNo }: PropsWithTableNo) => {
  const response = await signatureInstance.post(
    `${API_PATH.pos}/tables/${tableNo}/resend-receipt`
  );
  return response.data;
};

export const updateMenus = async ({
  tableNo,
  body,
}: PropsWithTableNo<{
  body: {
    orders: {
      orderId: string;
      orderMenus: { orderMenuId: string; quantity: number }[];
    }[];
  };
}>) => {
  const response = await signatureInstance.put(
    `${API_PATH.pos}/tables/${tableNo}/orders`,
    body
  );
  return response.data;
};
