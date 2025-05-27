import API_PATH from "./paths";
import { instance, authInstance } from "../axios/instance";

export const createAccount = async (body: Account) => {
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
}: Pick<Account, "phoneNumber">) => {
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
}: Pick<Account, "phoneNumber"> & { code: number }) => {
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
  body: Omit<Account, "phoneNumber">
): Promise<{ accessToken: string; refreshToken: string }> => {
  const response = await authInstance.post(`${API_PATH.account}/sign-in`, body);
  return response.data;
};

export const sendAuthMail = async (body: Pick<Account, "email">) => {
  const response = await authInstance.post(
    `${API_PATH.account}/send-auth-mail`,
    body
  );
  return response.data;
};

export const renewToken = async (body: {
  refreshToken: string;
}): Promise<{ accessToken: string; refreshToken: string }> => {
  const response = await authInstance.post(
    `${API_PATH.account}/renew-token`,
    body
  );
  return response.data;
};

export const getAccount = async (): Promise<UserProfile> => {
  const response = await instance.get(`${API_PATH.account}/me`);
  return response.data;
};
