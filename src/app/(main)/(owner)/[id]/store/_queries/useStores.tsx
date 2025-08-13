import { keepPreviousData, useMutation, useQuery } from "@tanstack/react-query";
import {
  getRegisters,
  getStoreInfoDetail,
  getStoreList,
  putUpdateStore,
  reapplyRegistration,
  reapplyRegistrationWithImage,
  registerDetails,
  registerStore,
} from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import getQueryClient from "@/app/get-query-client";
import { storeKeys } from "./keys";

const queryClient = getQueryClient();

const useRegistrationList = (page: number = 1) =>
  useQuery({
    queryKey: storeKeys.list(page),
    queryFn: () => getRegisters(page),
    placeholderData: keepPreviousData,
    staleTime: 1000 * 60 * 5,
  });

const useStoresList = (enabled: boolean) =>
  useQuery<{
    stores: { storeId: string; name: string }[];
  }>({
    queryKey: storeKeys.stores(),
    queryFn: () => getStoreList(),
    placeholderData: keepPreviousData,
    enabled,
    staleTime: 1000 * 60 * 5,
  });

const useRegistrationDetail = (registrationId: string) =>
  useQuery({
    queryKey: storeKeys.registration(registrationId),
    queryFn: () => registerDetails(JSON.stringify(registrationId)),
    enabled: !!registrationId,
    staleTime: 1000 * 60 * 5,
  });

const useStoresDetail = (storeId: string) =>
  useQuery({
    queryKey: storeKeys.detail(storeId),
    queryFn: () => getStoreInfoDetail(storeId),
    enabled: !!storeId,
    staleTime: 1000 * 60 * 5,
  });

const useRegister = () =>
  useMutation({
    mutationFn: registerStore,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: storeKeys.stores(),
      });
    },
  });

const useReapply = () =>
  useMutation({
    mutationFn: reapplyRegistration,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: storeKeys.all(),
      });
      queryClient.invalidateQueries({
        queryKey: storeKeys.registration(variables.registrationId),
      });
      queryClient.invalidateQueries({
        queryKey: storeKeys.all(),
      });
    },
  });

const useReapplyWithImg = () =>
  useMutation({
    mutationFn: reapplyRegistrationWithImage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: storeKeys.all() });
    },
  });

const useUpdateInfo = () =>
  useMutation({
    mutationFn: putUpdateStore,

    onMutate: async (variables) => {
      await queryClient.cancelQueries({
        queryKey: storeKeys.detail(variables.storeId),
      });
      const prevData = queryClient.getQueryData(
        storeKeys.detail(variables.storeId)
      );
      queryClient.setQueryData(
        storeKeys.detail(variables.storeId),
        variables.body
      );
      return { prevData };
    },
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: storeKeys.detail(variables.storeId),
      });
    },
    onError: (_, variables, context) => {
      queryClient.setQueryData(
        storeKeys.detail(variables.storeId),
        context?.prevData
      );
    },
  });

export const storesQueries = {
  useReapply,
  useReapplyWithImg,
  useRegister,
  useRegistrationDetail,
  useRegistrationList,
  useStoresDetail,
  useStoresList,
  useUpdateInfo,
};
