import { useParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { storeInfoSchema, TypeStoreInfo } from "@/schema/store.schema";
import getQueryClient from "@/app/get-query-client";
import useSettings from "../../settings/_hooks/useSettings";

export default function useStoreInfoForm() {
  const params = useParams();
  const storeId = params?.id as string;
  const queryClient = getQueryClient();

  const { data, updateSetting } = useSettings(storeId);

  const form = useForm<TypeStoreInfo>({
    mode: "onChange",
    resolver: zodResolver(storeInfoSchema),
    defaultValues: {
      name: data?.name,
      license: data?.license,
      address: data?.address,
      origins:
        data?.setting?.countryOfOrigins?.map((el) => ({
          ...el,
          isAdded: false,
        })) || [],
    },
  });

  const submitHandler = (values: TypeStoreInfo, onFinally: () => void) => {
    updateSetting(
      {
        countryOfOrigins: values.origins
          ?.filter((el) => el.isAdded || !el.item || !el.origin)
          .map((el) => ({
            item: el.item,
            origin: el.origin,
          })),
      },
      () => {
        queryClient.invalidateQueries({
          queryKey: ["store-detail-info", storeId],
        });
      },
      onFinally
    );
  };

  const newItem = {
    item: "",
    origin: "",
    isAdded: true,
  };

  return {
    form,
    submitHandler,
    newItem,
  };
}
