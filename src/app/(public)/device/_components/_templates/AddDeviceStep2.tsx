"use client";

import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { Form } from "@/components/common/Form";
import LabeledInput from "@/components/common/LabeledInput";
import cn from "@/lib/utils";
import Spinner from "@/components/common/Spinner";
import useStep2Form from "../../_hooks/useStep2Form";

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

export default function AddDeviceStep2({ ...props }: IProps) {
  const { form, submitHandler, purpose, setPurpose, isSubmitting } =
    useStep2Form({
      ...props,
    });

  return (
    <div className="flex flex-col gap-6">
      <div className="flex gap-2 lg:gap-3">
        {TABS.map((tab) => (
          <button
            type="button"
            key={tab.id}
            className={cn(
              "font-regular text-s h-10 w-full rounded-xl border lg:h-20 lg:rounded-2xl lg:text-base",
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
          onSubmit={form.handleSubmit(submitHandler)}
        >
          <LabeledInput
            form={form}
            label="기기 이름"
            name="deviceName"
            placeholder="기기 이름을 입력해주세요."
            readOnly={isSubmitting}
          />
          <ResponsiveButton
            type="submit"
            responsiveButtons={{
              sm: { buttonSize: "md", className: "w-full !h-10 mt-3" },
              md: { buttonSize: "sm", className: "w-full mt-3" },
              lg: { buttonSize: "lg", className: "w-full" },
            }}
            disabled={!form.watch("deviceName")}
          >
            {isSubmitting ? <Spinner /> : "등록하기"}
          </ResponsiveButton>
        </form>
      </Form>
    </div>
  );
}
