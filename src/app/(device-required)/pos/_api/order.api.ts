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

export const orderMenus = async (body: {
  tableNo: number;
  memo: string;
  orderMenus: OrderBody[];
}) => {
  const response = await signatureInstance.post(`${API_PATH.orders}`, body);
  return response.data;
};

export const approvePayment = async ({
  tableNo,
  body,
}: {
  tableNo: number;
  body: OrderPayments;
}) => {
  const response = await signatureInstance.post(
    `${API_PATH.orders}/payments/${tableNo}/approve`,
    body
  );
  return response.data;
};

export const cancelPayment = async ({
  orderPaymentId,
  body,
}: {
  orderPaymentId: string;
  body: Pick<OrderPayments, "approvalNo" | "tradeTime" | "tradeUniqueNo">;
}) => {
  const response = await signatureInstance.post(
    `${API_PATH.orders}/payments/${orderPaymentId}/cancel`,
    body
  );
  return response.data;
};
