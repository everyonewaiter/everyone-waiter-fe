import instance from "../axios/instance";
import API_PATH from "./paths";

export const registerStore = async (body: FormData) => {
  const response = await instance.post(
    `${API_PATH.stores}/registrations`,
    body,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
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

export const registerDetails = async (registrationId: number) => {
  const response = await instance.get(
    `${API_PATH.stores}/registrations/${registrationId}`
  );
  return response.data;
};

export const reapplyRegistration = async ({
  registrationId,
  ...body
}: {
  registrationId: number;
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
  registrationId: number;
  body: FormData;
}) => {
  const response = await instance.put(
    `${API_PATH.stores}/registrations/${registrationId}/with-image`,
    body,
    {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    }
  );
  return response.data;
};
