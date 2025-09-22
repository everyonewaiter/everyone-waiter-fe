import API_PATH from "@/lib/api/paths";
import { instance } from "@/lib/axios/instance";

interface GetAccountParams {
  email?: string;
  permission?: AccountPermission | "";
  state?: Status | "";
  hasStore?: boolean | null;
  page?: number;
  size?: number;
}

export const getAccounts = async ({
  email = "",
  permission = "",
  state = "",
  hasStore = null,
  page = 1,
  size = 20,
}: GetAccountParams): Promise<ResWithPagination<AdminAccount[]>> => {
  const params: GetAccountParams = {};
  if (email) params.email = email;
  if (permission) params.permission = permission;
  if (state) params.state = state;
  if (hasStore !== null) params.hasStore = hasStore;

  const response = await instance.get(`${API_PATH.admin}/accounts`, {
    params: {
      ...params,
      page,
      size,
    },
  });
  return response.data;
};

export const getDetailAccount = async (
  accountId: string
): Promise<AdminUser> => {
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
  accountId: string;
  permission: AccountPermission;
  state: Status;
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
}: TypeAdminRegistrations): Promise<ResWithPagination<AdminStores[]>> => {
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
  id: string
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
  id: string;
  reason: string;
}) => {
  const response = await instance.post(
    `${API_PATH.admin}/stores/registrations/${id}/reject`,
    { reason }
  );
  return response.data;
};

export const approveRegistration = async ({ id }: { id: string }) => {
  const response = await instance.post(
    `${API_PATH.admin}/stores/registrations/${id}/approve`
  );
  return response.data;
};
