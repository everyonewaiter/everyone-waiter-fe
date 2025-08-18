/* eslint-disable react-hooks/rules-of-hooks */
import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
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
import { accountKeys } from "./keys";
import { storeKeys } from "../../(owner)/[id]/store/_queries/keys";

const queryClient = getQueryClient();

const useAccount = ({
  email,
  state,
  permission,
  hasStore,
  page = 1,
}: {
  email: string;
  state: Status;
  permission: AccountPermission;
  hasStore: boolean | null;
  page: number;
}) =>
  useQuery({
    queryKey: accountKeys.all(page, email, permission, state),
    queryFn: () =>
      getAccounts({
        page,
        email,
        permission,
        state,
        hasStore,
      }),
    placeholderData: keepPreviousData,
  });

const useAccountDetail = (accountId: string) =>
  useQuery({
    queryKey: accountKeys.accountDetail(accountId),
    queryFn: () => getDetailAccount(accountId),
  });

const useUpdateAccount = () =>
  useMutation({
    mutationFn: updateDetailAccount,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: accountKeys.all() });
      queryClient.invalidateQueries({
        queryKey: accountKeys.accountDetail(variables.accountId),
      });
    },
  });

const useStores = (
  email: string,
  name: string,
  status?: RegisterStatus | null,
  page?: number
) =>
  useQuery({
    queryKey: accountKeys.allToApprove({ email, name, status, page }),
    queryFn: () =>
      getAdminRegistrations({ email, name, status, page, size: 20 }),
    placeholderData: keepPreviousData,
  });

const useStoresDetail = (registrationId: string) =>
  useQuery({
    queryKey: accountKeys.storeDetail(registrationId),
    queryFn: () => getDetailAdminRegistrations(registrationId),
  });

const useRejectStore = () =>
  useMutation({
    mutationFn: rejectResigtration,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: accountKeys.allToApprove() });
      queryClient.invalidateQueries({
        queryKey: accountKeys.storeDetail(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: storeKeys.list(1),
      });
    },
  });

const useApproveStore = () =>
  useMutation({
    mutationFn: approveRegistration,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({ queryKey: accountKeys.allToApprove() });
      queryClient.invalidateQueries({
        queryKey: accountKeys.storeDetail(variables.id),
      });
      queryClient.invalidateQueries({
        queryKey: storeKeys.list(1),
      });
    },
  });

export const adminQueries = {
  useAccount,
  useAccountDetail,
  useApproveStore,
  useRejectStore,
  useStores,
  useStoresDetail,
  useUpdateAccount,
};
