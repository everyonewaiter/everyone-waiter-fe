import { useFieldArray, useForm } from "react-hook-form";
import { useState } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import { storeInfoSchema, TypeStoreInfo } from "@/schema/store.schema";
import { zodResolver } from "@hookform/resolvers/zod";

export default function useStoreForm(data: StoreInfoDetail, storeId: string) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<TypeStoreInfo>({
    mode: "onSubmit",
    resolver: zodResolver(storeInfoSchema),
    values: {
      name: data.name,
      license: data.license,
      address: data.address,
      origins: data.setting.countryOfOrigins ?? [],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "origins",
  });

  const submitHandler = (
    action: UseMutationResult<any, Error, any, unknown>,
    successHandler: () => void
  ) => {
    setIsSubmitted(true);
    const origins = form.getValues("origins");

    action.mutate(
      {
        storeId,
        body: {
          landline: data?.landline!,
          setting: {
            ...data?.setting!,
            countryOfOrigins: origins.map((el) => ({
              item: el.item,
              origin: el.origin,
            })),
          },
        },
      },
      {
        onSuccess: successHandler,
        onSettled: () => setIsSubmitted(false),
      }
    );
  };

  const appendOrigin = () =>
    append({
      item: "",
      origin: "",
    });

  return {
    form,
    fields,
    isSubmitted,
    setIsSubmitted,
    submitHandler,
    appendOrigin,
    removeOrigin: remove,
  };
}
