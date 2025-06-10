import getQueryClient from "@/app/get-query-client";
import { putUpdateStore } from "@/lib/api/stores.api";
import { useMutation } from "@tanstack/react-query";
import useStores from "../../store/_hooks/useStores";

const queryClient = getQueryClient();

export default function useSettings(storeId: string) {
  const { detailStoreInfoQuery } = useStores();
  const { data } = detailStoreInfoQuery(storeId);

  const { mutate } = useMutation({
    mutationFn: putUpdateStore,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: ["store-detail-info", variables.storeId],
      });
    },
  });

  const updateSetting = (
    newSetting: Partial<Settings>,
    onSuccess?: () => void,
    onSettled?: () => void
  ) => {
    if (!data?.setting || !data?.landline) return;

    mutate(
      {
        storeId,
        body: {
          landline: data.landline,
          setting: {
            ...data.setting,
            ...newSetting,
          },
        },
      },
      { onSuccess, onSettled }
    );
  };

  return { updateSetting, data, settingData: data?.setting };
}
