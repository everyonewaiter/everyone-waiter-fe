import { instance } from "../axios/instance";
import API_PATH from "./paths";

interface GetAccountParams {
  searchEmail?: string;
  searchPermission?: TPermission | "";
  searchState?: TStatus | "";
  page?: number;
  size?: number;
}

export const getAccounts = async ({
  searchEmail = "",
  searchPermission = "",
  searchState = "",
  page = 1,
  size = 20,
}: GetAccountParams) => {
  const response = await instance.get(`${API_PATH.admin}/accounts`, {
    params: {
      email: encodeURIComponent(searchEmail),
      permission: encodeURIComponent(searchPermission),
      state: encodeURIComponent(searchState),
      page,
      size,
    },
  });
  return response.data;
};

export const getDetailAccount = async (accountId: bigint) => {
  const response = await instance.get(
    `${API_PATH.admin}/accounts/${accountId.toString()}`
  );
  return response.data;
};

export const updateDetailAccount = async ({
  accountId,
  permission,
  state,
}: {
  accountId: bigint;
  permission: TPermission;
  state: TStatus;
}) => {
  const response = await instance.put(
    `${API_PATH.admin}/accounts`,
    {
      permission,
      state,
    },
    {
      params: {
        accountId,
      },
    }
  );

  return response.data;
};
