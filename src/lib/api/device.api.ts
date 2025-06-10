import { authInstance, instance } from "../axios/instance";
import API_PATH from "./paths";

interface Ids {
  storeId: string;
  deviceId: string;
}

export const getDevices = async (
  storeId: string
): Promise<ResWithPagination<Device[]>> => {
  const response = await instance.get(`${API_PATH.stores}/${storeId}/devices`);
  return response.data;
};

export const getDetailDevice = async ({
  storeId,
  deviceId,
}: Ids): Promise<
  Device & { tableNo: number; ksnetDeviceNo: string; createdAt: string }
> => {
  const response = await instance.get(
    `${API_PATH.stores}/${storeId}/devices/${deviceId}`
  );
  return response.data;
};

export const updateDevice = async ({
  storeId,
  deviceId,
  ...body
}: Pick<Device, "name" | "purpose" | "paymentType"> & {
  tableNo: number;
  ksnetDeviceNo: string;
} & Ids) => {
  const response = await instance.put(
    `${API_PATH.stores}/${storeId}/devices/${deviceId}`,
    body
  );
  return response.data;
};

export const deleteDevice = async ({ storeId, deviceId }: Ids) => {
  const response = await instance.delete(
    `${API_PATH.stores}/${storeId}/devices/${deviceId}`
  );
  return response.data;
};

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
