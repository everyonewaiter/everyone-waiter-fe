import { useFieldArray, useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { UseMutationResult } from "@tanstack/react-query";

export interface FormType {
  name: string;
  license: string;
  address: string;
  origins: CountryOfOriginItem[];
}

export default function useStoreForm(data: StoreInfoDetail, storeId: string) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<FormType>({
    defaultValues: {
      name: "",
      license: "",
      address: "",
      origins: [],
    },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "origins",
  });

  useEffect(() => {
    if (data) {
      form.reset({
        name: data.name,
        license: data.license,
        address: data.address,
        origins: data.setting.countryOfOrigins ?? [],
      });
    }
  }, [data, form]);

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

  const createNewItem = {
    item: "",
    origin: "",
  };

  const appendOrigin = () => append(createNewItem);

  return {
    form,
    fields,
    isSubmitted,
    setIsSubmitted,
    submitHandler,
    appendOrigin,
  };
}
