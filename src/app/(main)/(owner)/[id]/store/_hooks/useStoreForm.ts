import { useFieldArray, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { UseMutationResult } from "@tanstack/react-query";
import { storeInfoSchema, TypeStoreInfo } from "@/schema/store.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { storesQueries } from "../_queries/useStores";

export default function useStoreForm(storeId: string) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { data } = storesQueries.useStoresDetail(storeId);

  const form = useForm<TypeStoreInfo>({
    mode: "onChange",
    resolver: zodResolver(storeInfoSchema),
  });

  useEffect(() => {
    form.reset({
      name: data?.name,
      license: data?.license,
      landline: data?.landline,
      address: data?.address,
      origins: data?.setting.countryOfOrigins ?? [],
    });
    // eslint-disable-next-line
  }, [data]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "origins",
  });

  const submitHandler = (
    action: UseMutationResult<any, Error, any, unknown>,
    successHandler: () => void
  ) => {
    if (!form.formState.isDirty) {
      // eslint-disable-next-line
      alert("변경사항이 없습니다.");
      successHandler();
      return;
    }

    setIsSubmitted(true);
    const origins = form.getValues("origins");

    const validOrigins = origins
      .filter((el) => el.item?.trim() && el.origin?.trim())
      .map((el) => ({
        item: el.item.trim(),
        origin: el.origin.trim(),
      }));

    action.mutate(
      {
        storeId,
        body: {
          landline: form.getValues("landline"),
          setting: {
            ...data?.setting!,
            countryOfOrigins: validOrigins,
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
