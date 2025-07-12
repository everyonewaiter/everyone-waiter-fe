/* eslint-disable react-hooks/rules-of-hooks */
import { useMutation, useQuery } from "@tanstack/react-query";
import getQueryClient from "@/app/get-query-client";
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
  const queryClient = getQueryClient();

  const accountList = (
    searchEmail: string,
    searchPermission: AccountPermission | "",
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

  const detailAccount = (accountId: string) =>
    useQuery({
      queryKey: ["detail-account", accountId],
      queryFn: () => getDetailAccount(accountId),
    });

  const updateDetail = useMutation({
    mutationFn: updateDetailAccount,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["get-account"] });
      queryClient.invalidateQueries({
        queryKey: ["detail-account", variables.accountId],
      });
    },
  });

  const storesList = (
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

  const detailStore = (registrationId: string) =>
    useQuery({
      queryKey: ["admin-stores-detail", registrationId],
      queryFn: () => getDetailAdminRegistrations(registrationId),
    });

  const rejectStore = useMutation({
    mutationFn: rejectResigtration,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["stores-to-approve"] });
      queryClient.invalidateQueries({
        queryKey: ["admin-stores-detail", variables.id],
      });
    },
  });

  const approveStore = useMutation({
    mutationFn: approveRegistration,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: ["stores-to-approve"] });
      queryClient.invalidateQueries({
        queryKey: ["admin-stores-detail", variables.id],
      });
    },
  });

  return {
    accountList,
    detailAccount,
    updateDetail,
    storesList,
    detailStore,
    rejectStore,
    approveStore,
  };
};

export default useAdmin;
