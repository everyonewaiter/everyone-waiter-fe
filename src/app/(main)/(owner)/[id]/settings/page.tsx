"use client";

import { FormProvider, useForm } from "react-hook-form";
import { useStoreContext } from "@/providers/storeProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import useSettings from "./_queries/useSettings";
import { settingsSchema, TypeSettingsForm } from "./_schema/settings.schema";
import StoreSection from "./_components/StoreSection";
import DeviceSection from "./_components/DeviceSection";
import OrderSection from "./_components/OrderSection";

export default function Settings() {
  const { storeId } = useStoreContext();

  const form = useForm<TypeSettingsForm>({
    mode: "onChange",
    resolver: zodResolver(settingsSchema),
    defaultValues: { optionText: "", deviceNumber: "" },
  });
  const { updateSetting, settingData } = useSettings(storeId);

  return (
    <div className="flex flex-col gap-8 md:mt-6 md:w-[480px] lg:mt-10">
      <div className="flex flex-col">
        <h1 className="text-gray-0 text-lg font-semibold lg:text-2xl">설정</h1>
      </div>
      <FormProvider {...form}>
        <div className="flex flex-col gap-6">
          <StoreSection
            data={settingData?.printerLocation}
            onAction={(key) => updateSetting({ printerLocation: key })}
          />
          <DeviceSection
            ksnetDeviceNo={settingData?.ksnetDeviceNo}
            onAction={(value) => updateSetting({ ksnetDeviceNo: value })}
          />
          <OrderSection storeId={storeId} {...settingData} />
        </div>
      </FormProvider>
    </div>
  );
}
