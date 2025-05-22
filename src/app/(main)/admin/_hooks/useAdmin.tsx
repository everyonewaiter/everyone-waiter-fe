/* eslint-disable react-hooks/rules-of-hooks */
import {
  approveRegistration,
  getAccounts,
  getAdminRegistrations,
  getDetailAccount,
  getDetailAdminRegistrations,
  rejectResigtration,
  updateDetailAccount,
} from "@/lib/api/admin.api";
import { useMutation, useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const accountListQuery = (
    searchEmail: string,
    searchPermission: Permission | "",
    searchState: Status | "",
    page: number = 1
  ) =>
    useQuery({
      queryKey: [
        "get-account",
        page,
        searchEmail,
        searchPermission,
        searchState,
      ],
      queryFn: () =>
        getAccounts({ page, searchEmail, searchPermission, searchState }),
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
      queryKey: ["stores-to-approve"],
      queryFn: () =>
        getAdminRegistrations({ email, name, status, page, size: 20 }),
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
    accountListQuery,
    detailAccountQuery,
    mutateUpdateDetail,
    adminStoresListQuery,
    detailStoreQuery,
    mutateRejectStore,
    mutateApproveStore,
  };
};

export default useAdmin;
