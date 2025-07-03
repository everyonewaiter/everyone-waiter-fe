import { useMutation } from "@tanstack/react-query";
import { putUpdateStore } from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import getQueryClient from "@/app/get-query-client";
import useStores from "../../store/_queries/useStores";
import { settingsKeys } from "./keys";

const queryClient = getQueryClient();

export default function useSettings(storeId: string) {
  const { storesDetail } = useStores();
  const { data } = storesDetail(storeId);

  const update = useMutation({
    mutationFn: putUpdateStore,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: settingsKeys.all(storeId),
      });
    },
  });

  const updateSetting = (
    newSetting: Partial<Settings>,
    onSuccess?: () => void
  ) => {
    if (!data?.setting || !data?.landline) return;
    update.mutate(
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
      { onSuccess }
    );
  };

  return { updateSetting, settingData: data?.setting };
}
