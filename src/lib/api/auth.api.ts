import API_PATH from "@/lib/api/paths";
import { authInstance, instance } from "@/lib/axios/instance";
import axios from "axios";

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

export const renewToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<{ accessToken: string; refreshToken: string }> => {
  const response = await axios.post(
    `${process.env.NEXT_PUBLIC_API_BASE_URL}/v1${API_PATH.account}/renew-token`,
    {
      refreshToken,
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
      timeout: 5000,
    }
  );
  return response.data;
};

export const getAccount = async (): Promise<UserProfile> => {
  const response = await instance.get(`${API_PATH.account}/me`);
  return response.data;
};
