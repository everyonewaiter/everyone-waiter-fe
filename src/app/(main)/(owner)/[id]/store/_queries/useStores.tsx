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
} from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { storeKeys } from "./keys";

const queryClient = getQueryClient();

const useStores = () => {
  const navigate = useRouter();

  const registrationList = (page: number = 1) =>
    useQuery({
      queryKey: storeKeys.list(),
      queryFn: () => getRegisters(page),
    });

  const registrationDetail = (registrationId: string) =>
    useQuery({
      queryKey: storeKeys.registration(registrationId),
      queryFn: () => registerDetails(JSON.stringify(registrationId)),
      enabled: !!registrationId,
    });

  const reapply = useMutation({
    mutationFn: reapplyRegistration,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: storeKeys.list(),
      });
      queryClient.invalidateQueries({
        queryKey: storeKeys.registration(variables.registrationId),
      });
    },
  });

  const add = useMutation({
    mutationFn: registerStore,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: storeKeys.stores(),
      });
      navigate.push("/create?state=pending");
    },
  });

  const reapplyWithImg = (storeId: string) =>
    useMutation({
      mutationFn: reapplyRegistrationWithImage,
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: storeKeys.list() });
        navigate.push(`/${storeId}`);
      },
    });

  const storesList = (enabled: boolean) =>
    useQuery<{
      stores: { storeId: string; name: string }[];
    }>({
      queryKey: storeKeys.stores(),
      queryFn: getStoreList,
      enabled,
    });

  const storesDetail = (storeId: string) =>
    useQuery({
      queryKey: storeKeys.detail(storeId),
      queryFn: () => getStoreInfoDetail(storeId),
      enabled: !!storeId,
    });

  return {
    registrationList,
    registrationDetail,
    add,
    reapply,
    reapplyWithImg,
    storesList,
    storesDetail,
  };
};

export default useStores;
