import API_PATH from "@/lib/api/paths";
import { instance } from "@/lib/axios/instance";

interface IDs {
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
}: IDs): Promise<
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
} & IDs) => {
  const response = await instance.put(
    `${API_PATH.stores}/${storeId}/devices/${deviceId}`,
    body
  );
  return response.data;
};

export const deleteDevice = async ({ storeId, deviceId }: IDs) => {
  const response = await instance.delete(
    `${API_PATH.stores}/${storeId}/devices/${deviceId}`
  );
  return response.data;
};
