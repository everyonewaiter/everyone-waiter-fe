import API_PATH from "@/lib/api/paths";
import { signatureInstance } from "@/lib/axios/instance";
import { PropsWithTableNo } from "./pos.api";

export const cancelOrder = async ({
  tableNo,
  orderId,
}: PropsWithTableNo<{ orderId: string }>) => {
  const response = await signatureInstance.post(
    `${API_PATH.pos}/tables/${tableNo}/orders/${orderId}/cancel`
  );
  return response.data;
};

export const discountOrder = async ({
  tableNo,
  body,
}: PropsWithTableNo<{ body: { discountPrice: number } }>) => {
  const response = await signatureInstance.post(
    `${API_PATH.pos}/tables/${tableNo}/discount`,
    body
  );
  return response.data;
};

export const completeOrder = async ({ tableNo }: PropsWithTableNo) => {
  const response = await signatureInstance.post(
    `${API_PATH.pos}/tables/${tableNo}/complete`
  );
  return response.data;
};

export const callStaff = async () => {
  const response = await signatureInstance.get(
    `${API_PATH.orders}/staff-calls`
  );
  return response.data;
};

export const orderMenus = async (
  body: PropsWithTableNo<{ memo: string; orderMenus: OrderBody[] }>
) => {
  const response = await signatureInstance.post(`${API_PATH.orders}`, body);
  return response.data;
};

export const updateMemo = async ({
  tableNo,
  orderId,
  body,
}: PropsWithTableNo<{ orderId: string; body: { memo: string } }>) => {
  const response = await signatureInstance.put(
    `${API_PATH.pos}/tables/${tableNo}/orders/${orderId}/memo`,
    body
  );
  return response.data;
};
