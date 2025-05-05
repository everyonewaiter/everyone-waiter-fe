import { useState } from "react";
import cn from "@/lib/utils";
import { useForm } from "react-hook-form";
import { Form } from "@/components/common/Form";
import LabeledInput from "@/components/common/LabeledInput";
import ResponsiveButton from "@/components/common/ResponsiveButton";

const tabs = [
  { id: "HALL", label: "홀 관리" },
  { id: "POS", label: "POS" },
];

export default function AddDeviceStep2() {
  const [activeIndex, setActiveIndex] = useState(0);

  const now = new Date();
  const dn = `POS-${now.getFullYear().toString().slice(-2)}${(now.getMonth() + 1).toString().padStart(2, "0")}${now.getDate().toString().padStart(2, "0")}${now.getHours().toString().padStart(2, "0")}${now.getMinutes().toString().padStart(2, "0")}${now.getSeconds().toString().padStart(2, "0")}${now.getMilliseconds().toString().padStart(3, "0")}`;

  const form = useForm<{ deviceName: string; deviceNumber: string }>({
    mode: "onChange",
    defaultValues: {
      deviceName: dn,
      deviceNumber: "",
    },
  });

  const submitHandler = () => {
    // activeIndex === 0 -> navigtae.push(홀 관리)
    // activeIndex === 1 -> navigate.push(POS)
  };

  // const handleOpenAlert = () => {
  //   // NOTE - 등록된 매장이 없을 때 사용
  //   open(() => (
  //     <Alert
  //       title="등록된 매장이 없습니다.\n매장을 먼저 등록해주세요!"
  //       onAction={close}
  //       onClose={close}
  //       buttonText="확인"
  //       hasNoCancel
  //     />
  //   ));
  // };

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
