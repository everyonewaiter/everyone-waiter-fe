/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  approveRegistration,
  getAccounts,
  getAdminRegistrations,
  getDetailAccount,
  getDetailAdminRegistrations,
  rejectResigtration,
  updateDetailAccount,
} from "../_api/admin.api";

const useAdmin = () => {
  const accountList = (
    searchEmail: string,
    searchPermission: Permission | "",
    searchState: Status | "",
    page: number = 1
  ) =>
    useQuery({
      queryKey: [
        "get-account",
        { page, searchEmail, searchPermission, searchState },
      ],
      queryFn: () =>
        getAccounts({ page, searchEmail, searchPermission, searchState }),
      placeholderData: (previousData) => previousData,
    });

  const detailAccountQuery = (accountId: bigint) =>
    useQuery({
      queryKey: ["detail-account", accountId],
      queryFn: () => getDetailAccount(accountId),
    });

  const { mutate: mutateUpdateDetail } = useMutation({
    mutationFn: updateDetailAccount,
  });

  const adminStoresListQuery = (
    email: string,
    name: string,
    status?: RegisterStatus | null,
    page?: number
  ) =>
    useQuery({
      queryKey: ["stores-to-approve", { email, name, status, page }],
      queryFn: () =>
        getAdminRegistrations({ email, name, status, page, size: 20 }),
      placeholderData: (previousData) => previousData,
    });

  const detailStoreQuery = (registrationId: bigint) =>
    useQuery({
      queryKey: ["admin-stores-detail", registrationId],
      queryFn: () => getDetailAdminRegistrations(registrationId),
    });

  const { mutate: mutateRejectStore } = useMutation({
    mutationFn: rejectResigtration,
  });

  const { mutate: mutateApproveStore } = useMutation({
    mutationFn: approveRegistration,
  });

  return {
    accountList,
    detailAccountQuery,
    mutateUpdateDetail,
    adminStoresListQuery,
    detailStoreQuery,
    mutateRejectStore,
    mutateApproveStore,
  };
};

export default useAdmin;
