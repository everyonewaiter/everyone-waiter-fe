"use client";

import { useState } from "react";
import cn from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Form } from "@/components/common/Form";
import LabeledInput from "@/components/common/LabeledInput";
import ResponsiveButton from "@/components/common/ResponsiveButton";
import { useMutation } from "@tanstack/react-query";
import { addDevice } from "@/lib/api/device.api";
import { useRouter } from "next/navigation";
import { setSecureItem } from "@/lib/auth/localStorage";

type FormValues = {
  deviceName: string;
  deviceNumber: string;
};

const tabs = [
  { id: "HALL", label: "홀 관리" },
  { id: "POS", label: "POS" },
];

interface IProps {
  storeId: string;
  phoneNumber: string;
}

export default function AddDeviceStep2({ storeId, phoneNumber }: IProps) {
  const navigate = useRouter();
  const [activeIndex, setActiveIndex] = useState(0);

  const now = new Date();
  const dn = `POS-${now.getFullYear().toString().slice(-2)}${(now.getMonth() + 1).toString().padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}${now.getHours().toString().padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now.getSeconds().toString().padStart(2, "0")}${now.getMilliseconds().toString().padStart(3, "0")}`;

  const form = useForm<FormValues>({
    mode: "onChange",
    defaultValues: {
      deviceName: dn,
      deviceNumber: "",
    },
  });

  const { mutate } = useMutation({
    mutationFn: addDevice,
  });

  const submitHandler = (data: FormValues) => {
    const submitData = {
      phoneNumber: phoneNumber.replaceAll("-", ""),
      storeId,
      name: data.deviceName,
      purpose: activeIndex === 0 ? "HALL" : ("POS" as DevicePurpose),
      tableNo: 0,
      ksnetDeviceNo: activeIndex === 1 ? data.deviceNumber : "",
      paymentType: "POSTPAID" as DevicePayment,
    };

    mutate(submitData, {
      onSuccess: (returnData) => {
        const { deviceId, secretKey } = returnData;
        setSecureItem("deviceInfo", {
          deviceId,
          name: submitData.name,
          purpose: submitData.purpose,
        });
        setSecureItem("secretKey", secretKey);
        navigate.push(activeIndex === 0 ? "/hall" : "/pos");
      },
    });
  };

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 lg:gap-3">
        {tabs.map((tab, index) => (
          <button
            type="button"
            key={tab.id}
            className={cn(
              "font-regular text-s h-10 w-full rounded-[12px] border lg:h-20 lg:rounded-[16px] lg:text-base",
              activeIndex === index
                ? "border-primary text-primary bg-[#f2202004]"
                : "border-gray-600 text-gray-200"
            )}
            onClick={() => setActiveIndex(index)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      <Form {...form}>
        <form
          className="flex flex-col gap-3 lg:gap-8"
          onSubmit={form.handleSubmit(submitHandler)}
        >
          <LabeledInput
            form={form}
            label="기기 이름"
            name="deviceName"
            placeholder="기기 이름을 입력해주세요."
          />
          <LabeledInput
            form={form}
            label="단말기 번호"
            name="deviceNumber"
            placeholder="단말기 번호를 입력해주세요."
          />
          <ResponsiveButton
            type="submit"
            responsiveButtons={{
              sm: { buttonSize: "md", className: "w-full !h-10 mt-3" },
              md: { buttonSize: "sm", className: "w-full mt-3" },
              lg: { buttonSize: "lg", className: "w-full" },
            }}
            disabled={!form.watch("deviceNumber")}
          >
            등록하기
          </ResponsiveButton>
        </form>
      </Form>
    </div>
  );
}
