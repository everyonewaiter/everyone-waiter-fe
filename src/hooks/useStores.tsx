"use client";

/* eslint-disable react-hooks/rules-of-hooks */
import {
  getRegisters,
  reapplyRegistration,
  reapplyRegistrationWithImage,
  registerDetails,
  registerStore,
} from "@/lib/api/stores.api";
import { useInfiniteQuery, useMutation, useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

const useStores = () => {
  const navigate = useRouter();

  const { mutate: register } = useMutation({
    mutationFn: registerStore,
    onSuccess: () => navigate.push("/store/create?state=pending"),
  });

  const { data: registerations, isLoading: isLoadingForRegistrations } =
    useInfiniteQuery({
      queryKey: ["get-stores"],
      queryFn: ({ pageParam = 1 }) => getRegisters(pageParam),
      getNextPageParam: (lastPage, allPages) => {
        const total = lastPage.registrationCount;
        const fetchedSoFar = allPages.reduce(
          (sum, page) => sum + page.registrations.length,
          0
        );

        return fetchedSoFar < total ? allPages.length + 1 : undefined;
      },
      initialPageParam: 1,
    });

  const getDetailRegistration = (registrationId: number) =>
    useQuery({
      queryKey: ["register-detail", registrationId],
      queryFn: () => registerDetails(registrationId),
      enabled: !!registrationId,
    });

  const { mutate: reapplyRegister } = useMutation({
    mutationFn: reapplyRegistration,
    onSuccess: () => {
      navigate.push("/stores");
      // queryClient.invalidateQueries({ queryKey: ["get-stores"] });
    },
  });

  const { mutate: reapplyRegisterWithImage } = useMutation({
    mutationFn: reapplyRegistrationWithImage,
    onSuccess: () => {
      navigate.push("/stores");
      // queryClient.invalidateQueries({ queryKey: ["get-stores"] });
    },
  });

  return {
    register,
    registerations,
    getDetailRegistration,
    reapplyRegister,
    reapplyRegisterWithImage,
    isLoadingForRegistrations,
  };
};

export default useStores;
