import { storeSchema, TypeStore } from "@/schema/store.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { storesQueries } from "../_queries/useStores";

export default function useStoreApplyForm(
  data: StoreDetail,
  close: () => void
) {
  const form = useForm<TypeStore>({
    mode: "onChange",
    resolver: zodResolver(storeSchema),
  });

  useEffect(() => {
    if (data?.registrationId) {
      form.reset({ ...data });
    }
    // disable-eslint
  }, [data?.registrationId]);

  const reapply = storesQueries.useReapply();
  const reapplyWithImg = storesQueries.useReapplyWithImg();

  const handleReapplyWithImage = (
    result: TypeStore,
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
      { onSuccess: reapplyImgHandler }
    );
  };

  const handleReapply = (result: TypeStore) => {
    reapply.mutate(
      {
        registrationId: data.registrationId.toString(),
        ...result,
      },
      { onSuccess: () => close() }
    );
  };

  const handleSubmit = (
    result: TypeStore,
    prevHandler: () => void,
    reapplyImgHandler: () => void
  ) => {
    prevHandler();

    if (typeof result.image === "string") {
      handleReapply(result);
    } else {
      handleReapplyWithImage(result, reapplyImgHandler);
    }
  };

  return { form, submit: handleSubmit };
}
