"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { getClientCookie } from "@/lib/cookies/client";
import { addStoreSchema, TypeAddStoreForm } from "@/schema/store.schema";
import { storesQueries } from "../../(owner)/[id]/store/_queries/useStores";

export default function useCreateForm(storeId?: string) {
  const navigate = useRouter();
  const { mutate } = storesQueries.useRegister();

  const permission = getClientCookie("permission");

  const [isSubmitted, setIsSubmitted] = useState(false);

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

  const handleSubmit = (data: TypeAddStoreForm) => {
    setIsSubmitted(true);

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("ceoName", data.ceoName);
    formData.append("address", `${data.address} ${data.detailAddress}`);
    formData.append("landline", data.landline);
    formData.append("license", data.license);
    if (data.image) {
      formData.append("file", data.image);
    }
    setIsSubmitted(false);

    mutate(formData, {
      onError: () => setIsSubmitted(false),
      onSuccess: () => {
        setTimeout(() => {
          if (permission === "USER") {
            navigate.replace("/main/create?state=pending");
          } else {
            navigate.replace(`/${storeId}`);
          }
        }, 300);
        setIsSubmitted(false);
      },
      onSettled: () => setIsSubmitted(false),
    });
  };

  return {
    form,
    onSubmit: handleSubmit,
    isSubmitted,
  };
}
