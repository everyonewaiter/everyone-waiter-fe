import { IResWithPagination } from "@/types";
import { formInstance, instance } from "../axios/instance";
import API_PATH from "./paths";

export const registerStore = async (body: FormData) => {
  const response = await formInstance.post(
    `${API_PATH.stores}/registrations`,
    body
  );
  return response.data;
};

export const getRegisters = async (
  page: number = 1,
  size: number = 20
): Promise<IResWithPagination<StoreDetail[]>> => {
  const response = await instance.get(
    `${API_PATH.stores}/registrations?page=${page}&size=${size}`
  );
  return response.data;
};

export const registerDetails = async (registrationId: string) => {
  const response = await instance.get(
    `${API_PATH.stores}/registrations/${registrationId}`
  );
  return response.data;
};

export const reapplyRegistration = async ({
  registrationId,
  ...body
}: Omit<StoreForm, "file"> & { registrationId: string }) => {
  const response = await instance.put(
    `${API_PATH.stores}/registrations/${registrationId}`,
    body
  );
  return response.data;
};

export const reapplyRegistrationWithImage = async ({
  registrationId,
  ...body
}: {
  registrationId: string;
  body: FormData;
}) => {
  const response = await formInstance.put(
    `${API_PATH.stores}/registrations/${registrationId}/with-image`,
    body
  );
  return response.data;
};

// 매장 목록
export const getStoreList = async (): Promise<StoreList> => {
  const response = await instance.get(`${API_PATH.stores}`);
  return response.data;
};

// 매장 상세 정보
export const getStoreInfoDetail = async (
  storeId: bigint
): Promise<IStoreInfoDetail> => {
  const response = await instance.get(`${API_PATH.stores}/${storeId}`);
  return response.data;
};
