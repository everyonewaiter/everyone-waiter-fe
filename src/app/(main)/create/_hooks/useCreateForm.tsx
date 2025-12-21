"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { addStoreSchema, TypeAddStoreForm } from "@/schema/store.schema";
import { useState, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { getClientCookie } from "@/lib/cookies/client";
import useLeaveGuard from "@/hooks/useCheckLeave";
import { storesQueries } from "../../(owner)/[id]/store/_queries/useStores";

export default function useCreateForm(storeId: string) {
  const form = useForm<TypeAddStoreForm>({
    mode: "onSubmit",
    resolver: zodResolver(addStoreSchema),
    defaultValues: {
      name: "",
      ceoName: "",
      address: "",
      landline: "",
      license: "",
      image: "",
      detailAddress: "",
    },
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const permission = getClientCookie("permission");
  const pendingNavigationRef = useRef<string | null>(null);

  const { mutate } = storesQueries.useRegister();

  const handleSubmit = async (data: TypeAddStoreForm) => {
    if (isSubmitting) return;

    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("ceoName", data.ceoName);
    formData.append("address", `${data.address} ${data.detailAddress}`);
    formData.append("landline", data.landline);
    formData.append("license", data.license);
    if (data.image) {
      formData.append("file", data.image);
    }

    mutate(formData, {
      onSuccess: () => {
        let targetPath = "/main/create?state=pending";
        if (permission !== "USER" && storeId) {
          targetPath = `/${storeId}`;
        }
        pendingNavigationRef.current = targetPath;

        setIsSubmitting(false);
        form.reset();
      },
      onError: () => {
        setIsSubmitting(false);
      },
    });
  };

  useEffect(() => {
    if (
      pendingNavigationRef.current &&
      !isSubmitting &&
      !form.formState.isDirty
    ) {
      const targetPath = pendingNavigationRef.current;
      pendingNavigationRef.current = null;

      const timeoutId = setTimeout(() => {
        window.location.href = targetPath;
      }, 150);

      return () => clearTimeout(timeoutId);
    }
    return undefined;
  }, [isSubmitting, form.formState.isDirty]);

  useLeaveGuard({
    shouldBlock: form.formState.isDirty,
    allowNavigation: true,
    isSubmitting,
  });

  return { form, isSubmitting, handleSubmit };
}
