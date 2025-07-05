import API_PATH from "@/lib/api/paths";
import { signatureInstance } from "@/lib/axios/instance";
import { PropsWithTableNo } from "./pos.api";

export const approvePayment = async ({
  tableNo,
  body,
}: PropsWithTableNo<{ body: OrderPayments }>) => {
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
