import API_PATH from "@/lib/api/paths";
import { authInstance, signatureInstance } from "@/lib/axios/instance";

export const addDevice = async ({
  storeId,
  ...body
}: Omit<Device, "state" | "updatedAt" | "deviceId"> & {
  tableNo: number;
  ksnetDeviceNo: string;
  phoneNumber: string;
  storeId: string;
}): Promise<{ deviceId: bigint; secretKey: string }> => {
  const response = await authInstance.post(
    `${API_PATH.stores}/${storeId}/devices`,
    body
  );
  return response.data;
};

export const verifyPhoneInDevice = async ({
  ...body
}: {
  phoneNumber: string;
  code: number;
}) => {
  const response = await authInstance.post(
    `${API_PATH.devices}/verify-auth-code`,
    body
  );
  return response.data;
};

export const sendAuthCodeInDevice = async ({
  ...body
}: {
  phoneNumber: string;
}) => {
  const response = await authInstance.post(
    `${API_PATH.devices}/send-auth-code`,
    body
  );
  return response.data;
};

export const getDeviceDetail = async () => {
  const response = await signatureInstance.get(`${API_PATH.devices}`);
  return response.data;
};
