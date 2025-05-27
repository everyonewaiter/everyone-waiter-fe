"use client";

import getQueryClient from "@/app/get-query-client";
/* eslint-disable react-hooks/rules-of-hooks */
import {
  getRegisters,
  getStoreInfoDetail,
  getStoreList,
  reapplyRegistration,
  reapplyRegistrationWithImage,
  registerDetails,
  registerStore,
} from "@/lib/api/stores.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const queryClient = getQueryClient();

const useStores = () => {
  const navigate = useRouter();

  const mutateRegisterStore = useMutation({
    mutationFn: registerStore,
    onSuccess: () => navigate.push("/create?state=pending"),
  });

  const registrationListQuery = (page: number = 1) =>
    useQuery({
      queryKey: ["get-stores"],
      queryFn: () => getRegisters(page),
    });

  const getDetailRegistrationQuery = (registrationId: bigint) =>
    useQuery({
      queryKey: ["register-detail", registrationId],
      queryFn: () => registerDetails(JSON.stringify(registrationId)),
      enabled: !!registrationId,
    });

  const { mutate: mutateReapply } = useMutation({
    mutationFn: reapplyRegistration,
  });

  const mutateReapplyWithImage = (storeId: string) =>
    useMutation({
      mutationFn: reapplyRegistrationWithImage,
      onSuccess: () => {
        navigate.push(`/${storeId}`);
        queryClient.invalidateQueries({ queryKey: ["get-stores"] });
      },
    });

  const acceptedStoresListQuery = (enabled: boolean) =>
    useQuery<{
      stores: { storeId: string; name: string }[];
    }>({
      queryKey: ["get-stores-list"],
      queryFn: getStoreList,
      enabled,
    });

  const detailStoreInfoQuery = (storeId: string) =>
    useQuery({
      queryKey: ["store-detail-info", String(storeId)],
      queryFn: () => getStoreInfoDetail(storeId),
    });

  return {
    mutateRegisterStore,
    mutateReapply,
    mutateReapplyWithImage,
    getDetailRegistrationQuery,
    registrationListQuery,
    acceptedStoresListQuery,
    detailStoreInfoQuery,
  };
};

export default useStores;
