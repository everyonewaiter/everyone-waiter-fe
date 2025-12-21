"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { addStoreSchema, TypeAddStoreForm } from "@/schema/store.schema";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { getClientCookie } from "@/lib/cookies/client";
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
        form.reset();
        window.location.href = targetPath;
      },
      onError: () => setIsSubmitting(false),
    });
  };

  return { form, isSubmitting, handleSubmit };
}
