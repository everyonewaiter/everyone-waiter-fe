import API_PATH from "@/lib/api/paths";
import { signatureInstance } from "@/lib/axios/instance";

export const getStaffCalls = async (): Promise<{ staffCalls: StaffCall[] }> => {
  const response = await signatureInstance.get(
    `${API_PATH.orders}/staff-calls`
  );
  return response.data;
};

export const getHallWaitingsList = async (): Promise<{
  waitings: Waiting[];
}> => {
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

export const getActiveOrders = async (): Promise<{ orders: TableOrder[] }> => {
  const response = await signatureInstance.get(`${API_PATH.orders}/tables`);
  return response.data;
};

export const orderList = async (): Promise<{
  served: HallOrder[];
  unserved: HallOrder[];
}> => {
  const response = await signatureInstance.get(`${API_PATH.orders}/hall`);
  return response.data;
};
