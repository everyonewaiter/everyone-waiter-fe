import { IResWithPagination } from "@/types/common";
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
}: GetAccountParams): Promise<IResWithPagination<AdminAccount[]>> => {
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
    `${API_PATH.admin}/accounts/${accountId}`,
    {
      permission,
      state,
    }
  );

  return response.data;
};

interface TypeAdminRegistrations {
  email?: string;
  name?: string;
  status?: RegisterStatus | null;
  page?: number;
  size?: number;
}

export const getAdminRegistrations = async ({
  email,
  name,
  status,
  page = 1,
  size = 20,
}: TypeAdminRegistrations): Promise<IResWithPagination<TypeAdminStores[]>> => {
  const response = await instance.get(
    `${API_PATH.admin}/stores/registrations`,
    {
      params: {
        email,
        name,
        status: status ?? "",
        page,
        size,
      },
    }
  );
  return response.data;
};

export const getDetailAdminRegistrations = async (
  id: bigint
): Promise<StoreDetail> => {
  const response = await instance.get(
    `${API_PATH.admin}/stores/registrations/${id}`
  );
  return response.data;
};

export const rejectResigtration = async ({
  id,
  reason,
}: {
  id: bigint;
  reason: string;
}) => {
  const response = await instance.post(
    `${API_PATH.admin}/stores/registrations/${id}/reject`,
    { reason }
  );
  return response.data;
};

export const approveRegistration = async (id: bigint) => {
  const response = await instance.post(
    `${API_PATH.admin}/stores/registrations/${id}/approve`
  );
  return response.data;
};
