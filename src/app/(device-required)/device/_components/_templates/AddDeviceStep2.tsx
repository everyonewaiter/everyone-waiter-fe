"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { Form } from "@/components/common/Form";
import LabeledInput from "@/components/common/LabeledInput";
import { setEncryptedItem } from "@/lib/auth/secureStorage";
import cn from "@/lib/utils";
import makeDeviceName from "@/utils/makeDeviceName";
import { deviceQueries } from "../../_queries/useDeviceInfo";
import useStep2Form from "../../_hooks/useStep2Form";
import { TypeDeviceStep2Form } from "../../_schema/device.schema";

type DevicePurpose = "HALL" | "POS";

const TABS: { id: DevicePurpose; label: string }[] = [
  { id: "HALL", label: "홀 관리" },
  { id: "POS", label: "POS" },
] as const;

interface IProps {
  storeId: string;
  phoneNumber: string;
  storeName: string;
}

export default function AddDeviceStep2({
  storeId,
  storeName,
  phoneNumber,
}: IProps) {
  const navigate = useRouter();
  const [purpose, setPurpose] = useState<DevicePurpose>("HALL");

  const {
    form: { form, watch, handleSubmit },
  } = useStep2Form();

  useEffect(() => {
    form.setValue("deviceName", makeDeviceName(purpose));
    // eslint-disable-next-line
  }, [purpose]);

  const { mutate } = deviceQueries.useAddDevice();

  const submitHandler = (data: TypeDeviceStep2Form) => {
    const submitData = {
      phoneNumber: phoneNumber.replaceAll("-", ""),
      storeId,
      name: data.deviceName,
      purpose,
      tableNo: 1,
      paymentType: "POSTPAID" as DevicePayment,
    };

    mutate(submitData, {
      onSuccess: async (returnData) => {
        const { deviceId, secretKey } = returnData;
        await setEncryptedItem({
          key: "@deviceInfo",
          value: {
            deviceId,
            storeId: submitData.storeId,
            storeName,
            name: submitData.name,
            purpose: submitData.purpose,
          },
          deviceId: String(deviceId),
          storeId: submitData.storeId,
        });

        await setEncryptedItem({
          key: "@secretKey",
          value: secretKey,
          deviceId: String(deviceId),
          storeId: submitData.storeId,
        });
        localStorage.setItem(
          "@meta",
          JSON.stringify({
            deviceId,
            storeId: submitData.storeId,
          })
        );

        navigate.replace(purpose === "HALL" ? "/hall" : "/pos");
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 lg:gap-3">
        {TABS.map((tab) => (
          <button
            type="button"
            key={tab.id}
            className={cn(
              "font-regular text-s h-10 w-full rounded-[12px] border lg:h-20 lg:rounded-[16px] lg:text-base",
              purpose === tab.id
                ? "border-primary text-primary bg-[#f2202004]"
                : "border-gray-600 text-gray-200"
            )}
            onClick={() => setPurpose(tab.id)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-3 lg:gap-8"
          onSubmit={handleSubmit(submitHandler)}
        >
          <LabeledInput
            form={form}
            label="기기 이름"
            name="deviceName"
            placeholder="기기 이름을 입력해주세요."
          />
          <ResponsiveButton
            type="submit"
            responsiveButtons={{
              sm: { buttonSize: "md", className: "w-full !h-10 mt-3" },
              md: { buttonSize: "sm", className: "w-full mt-3" },
              lg: { buttonSize: "lg", className: "w-full" },
            }}
            disabled={!watch("deviceName")}
          >
            등록하기
          </ResponsiveButton>
        </form>
      </Form>
    </div>
  );
}
