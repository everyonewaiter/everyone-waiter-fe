import API_PATH from "@/lib/api/paths";
import { signatureInstance } from "@/lib/axios/instance";

export const getWaitingsList = async (): Promise<{ waitings: Waiting[] }> => {
  const response = await signatureInstance.get(`${API_PATH.waitings}`);
  return response.data;
};

export const serveOrder = async ({ orderId }: { orderId: string }) => {
  const response = await signatureInstance.post(
    `${API_PATH.orders}/${orderId}/serving`
  );
  return response.data;
};

export const serveMenu = async ({
  orderId,
  orderMenuId,
}: {
  orderId: string;
  orderMenuId: string;
}) => {
  const response = await signatureInstance.post(
    `${API_PATH.orders}/${orderId}/menus/${orderMenuId}/serving`
  );
  return response.data;
};

export const completeStaffCall = async ({
  staffCallId,
}: {
  staffCallId: string;
}) => {
  const response = await signatureInstance.post(
    `${API_PATH.orders}/staff-calls/${staffCallId}/complete`
  );
  return response.data;
};
