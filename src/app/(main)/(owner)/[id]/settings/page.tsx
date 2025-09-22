"use client";

import { useStoreContext } from "@/providers/storeProvider";
import useSettings from "./_queries/useSettings";
import StoreSection from "./_components/StoreSection";
import DeviceSection from "./_components/DeviceSection";
import OrderSection from "./_components/OrderSection";

export default function Settings() {
  const { storeId } = useStoreContext();

  const { updateSetting, settingData } = useSettings(storeId);

  return (
    <div className="flex flex-col gap-8 md:mt-6 md:w-[480px] lg:mt-10">
      <div className="flex flex-col">
        <h1 className="text-gray-0 text-lg font-semibold lg:text-2xl">설정</h1>
      </div>
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
    </div>
  );
}
