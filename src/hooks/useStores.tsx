"use client";

import getQueryClient from "@/app/get-query-client";
/* eslint-disable react-hooks/rules-of-hooks */
import {
  getRegisters,
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

  const { mutate: register } = useMutation({
    mutationFn: registerStore,
    onSuccess: () => navigate.push("/store/create?state=pending"),
  });

  const registrationList = (page: number = 1) =>
    useQuery({
      queryKey: ["get-stores"],
      queryFn: () => getRegisters(page),
    });

  const getDetailRegistration = (registrationId: bigint) =>
    useQuery({
      queryKey: ["register-detail", registrationId],
      queryFn: () => registerDetails(JSON.stringify(registrationId)),
      enabled: !!registrationId,
    });

  const { mutate: reapplyRegister } = useMutation({
    mutationFn: reapplyRegistration,
    onSuccess: () => {
      navigate.push("/stores");
      queryClient.invalidateQueries({ queryKey: ["get-stores"] });
    },
  });

  const { mutate: reapplyRegisterWithImage } = useMutation({
    mutationFn: reapplyRegistrationWithImage,
    onSuccess: () => {
      navigate.push("/stores");
      queryClient.invalidateQueries({ queryKey: ["get-stores"] });
    },
  });

  const acceptedStoresListQuery = useQuery<{
    stores: { storeId: bigint; name: string }[];
  }>({
    queryKey: ["get-stores-list"],
    queryFn: getStoreList,
  });

  return {
    register,
    getDetailRegistration,
    reapplyRegister,
    reapplyRegisterWithImage,
    registrationList,
    acceptedStoresListQuery,
  };
};

export default useStores;
