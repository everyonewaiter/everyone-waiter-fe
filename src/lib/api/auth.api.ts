import API_PATH from "./paths";
import instance, { authInstance } from "../axios/instance";

export const createAccount = async (body: TAccount) => {
  const response = await authInstance.post(API_PATH.account, body);
  return response.data;
};

export const verifyEmail = async ({ token }: { token: string }) => {
  const response = await authInstance.post(
    `${API_PATH.account}/verify-auth-mail?token=${token}`
  );
  return response.data;
};

export const sendAuthCode = async ({
  phoneNumber,
}: Pick<TAccount, "phoneNumber">) => {
  const response = await authInstance.post(
    `${API_PATH.account}/send-auth-code`,
    {
      phoneNumber,
    }
  );
  return response.data;
};

export const verifyAuthCode = async ({
  phoneNumber,
  code,
}: Pick<TAccount, "phoneNumber"> & { code: number }) => {
  const response = await authInstance.post(
    `${API_PATH.account}/verify-auth-code`,
    {
      phoneNumber,
      code,
    }
  );
  return response.data;
};

export const login = async (
  body: Omit<TAccount, "phoneNumber">
): Promise<{ accessToken: string; refreshToken: string }> => {
  const response = await authInstance.post(`${API_PATH.account}/sign-in`, body);
  return response.data;
};

export const sendAuthMail = async (body: Pick<TAccount, "email">) => {
  const response = await authInstance.post(
    `${API_PATH.account}/send-auth-mail`,
    body
  );
  return response.data;
};

export const renewToken = async (body: {
  refreshToken: string;
}): Promise<{ accessToken: string; refreshToken: string }> => {
  const response = await instance.post(`${API_PATH.account}/renew-token`, body);
  return response.data;
};

export const getAccount = async () => {
  const response = await instance.get(`${API_PATH.account}/me`);
  return response.data;
};
