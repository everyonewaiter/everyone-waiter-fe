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
): Promise<{ registrationCount: number; registrations: StoreDetail[] }> => {
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
}: {
  registrationId: string;
  body: Omit<StoreForm, "file">;
}) => {
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
