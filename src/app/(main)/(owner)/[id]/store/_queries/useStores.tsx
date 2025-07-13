"use client";

import { useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
/* eslint-disable react-hooks/rules-of-hooks */
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

const useStores = () => {
  const navigate = useRouter();

  const registrationList = (page: number = 1) =>
    useQuery({
      queryKey: storeKeys.list(page),
      queryFn: () => getRegisters(page),
      placeholderData: (previousData) => previousData,
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
        queryKey: storeKeys.all(),
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
        queryClient.invalidateQueries({ queryKey: storeKeys.all() });
        navigate.push(`/${storeId}`);
      },
    });

  const storesList = () =>
    useQuery<{
      stores: { storeId: string; name: string }[];
    }>({
      queryKey: storeKeys.stores(),
      queryFn: getStoreList,
    });

  const storesDetail = (storeId: string) =>
    useQuery({
      queryKey: storeKeys.detail(storeId),
      queryFn: () => getStoreInfoDetail(storeId),
      enabled: !!storeId,
    });

  const updateInfo = useMutation({
    mutationFn: putUpdateStore,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: storeKeys.detail(variables.storeId),
      });
    },
  });

  return {
    registrationList,
    registrationDetail,
    add,
    reapply,
    reapplyWithImg,
    storesList,
    storesDetail,
    updateInfo,
  };
};

export default useStores;
