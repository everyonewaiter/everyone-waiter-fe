import {
  registrationSchema,
  TypeRegistrationForm,
} from "@/schema/store.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { storesQueries } from "../_queries/useStores";

export default function useStoreApplyForm(
  data: StoreDetail,
  close: () => void
) {
  const [isSubmitted, setIsSubmitted] = useState(false);

  const form = useForm<TypeRegistrationForm>({
    mode: "onChange",
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      ceoName: data.ceoName,
      name: data.name,
      landline: data.landline,
      license: data.license,
      address: data.address,
      image: data.image,
    },
  });

  useEffect(() => {
    if (data?.registrationId) {
      form.reset({ ...data });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.registrationId]);

  const reapply = storesQueries.useReapply();
  const reapplyWithImg = storesQueries.useReapplyWithImg();

  const handleReapplyWithImage = (
    result: TypeRegistrationForm,
    reapplyImgHandler: () => void
  ) => {
    const formData = new FormData();
    formData.append("name", result.name);
    formData.append("ceoName", result.ceoName);
    formData.append("landline", result.landline);
    formData.append("license", result.license);
    formData.append("address", result.address);
    formData.append("file", result.image as File);

    reapplyWithImg.mutate(
      {
        registrationId: data.registrationId.toString(),
        body: formData,
      },
      { onSuccess: reapplyImgHandler, onError: () => setIsSubmitted(false) }
    );
  };

  const handleReapply = (result: TypeRegistrationForm) => {
    reapply.mutate(
      {
        registrationId: data.registrationId.toString(),
        ...result,
      },
      { onSuccess: () => close(), onError: () => setIsSubmitted(false) }
    );
  };

  const handleSubmit = (
    result: TypeRegistrationForm,
    reapplyImgHandler: () => void
  ) => {
    setIsSubmitted(true);

    if (typeof result.image === "string") {
      handleReapply(result);
    } else {
      handleReapplyWithImage(result, reapplyImgHandler);
    }
  };

  return { form, submit: handleSubmit, isSubmitted };
}
