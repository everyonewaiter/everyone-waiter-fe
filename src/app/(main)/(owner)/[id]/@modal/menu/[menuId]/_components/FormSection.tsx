import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Dropdown from "@/components/common/Dropdown";
import { Form } from "@/components/common/Form";
import Label from "@/components/common/Label";
import LabeledInput from "@/components/common/LabeledInput";
import Switch from "@/components/common/Switch";
import cn from "@/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";

interface IProps {
  isEditing: boolean;
}

export default function FormSection({ isEditing }: IProps) {
  const form = useForm({
    mode: "onChange",
    defaultValues: {
      image: "",
      category: "",
      name: "",
      description: "",
      price: 0,
      state: undefined,
      printEnabled: false,
      tag: null,
    },
  });

  const [active, setActive] = useState("스테이크");

  const inputGap = "gap-1 lg:gap-2";
  const marginTop = "mt-2 lg:mt-4";

  return (
    <section className="flex h-full basis-[32.81%] rounded-[12px] border border-gray-600 p-4 lg:rounded-[24px] lg:p-6 lg:pb-0">
      <Form {...form}>
        <form
          className="flex w-full flex-col"
          // onSubmit={form.handleSubmit(submitHandler)}
        >
          <div className={cn("flex flex-col", inputGap)}>
            <Label disabled={!isEditing}>카테고리</Label>
            <Dropdown
              data={["스테이크"]}
              defaultText="스테이크"
              active={active}
              setActive={setActive}
              disabled={!isEditing}
            />
          </div>
          <LabeledInput
            form={form}
            name="name"
            label="메뉴명"
            disabled={!isEditing}
            containerClassName={cn(inputGap, marginTop)}
          />
          <LabeledInput
            form={form}
            name="description"
            label="메뉴 설명"
            disabled={!isEditing}
            containerClassName={cn(inputGap, marginTop)}
          />
          <LabeledInput
            form={form}
            name="price"
            label="가격"
            disabled={!isEditing}
            containerClassName={cn(inputGap, marginTop)}
          />
          <div className={cn("flex flex-col gap-2", marginTop)}>
            <Label>태그</Label>
            {["기본"].map((key) => (
              <ResponsiveButton
                key={key}
                variant="outline"
                responsiveButtons={{
                  lg: {
                    buttonSize: "sm",
                    className: "w-fit !rounded-[40px]",
                  },
                  md: {
                    buttonSize: "custom",
                    className: "w-fit !rounded-[40px] h-7 px-3 text-xs",
                  },
                  sm: {
                    buttonSize: "custom",
                    className: "w-fit !rounded-[40px] h-7 px-3 text-xs",
                  },
                }}
              >
                {key}
              </ResponsiveButton>
            ))}
          </div>
          <div className={cn("flex flex-col gap-2", marginTop)}>
            <Label>상태</Label>
            {["기본"].map((key) => (
              <ResponsiveButton
                key={key}
                variant="outline"
                responsiveButtons={{
                  lg: {
                    buttonSize: "sm",
                    className: "w-fit !rounded-[40px]",
                  },
                  md: {
                    buttonSize: "custom",
                    className: "w-fit !rounded-[40px] h-7 px-3 text-xs",
                  },
                  sm: {
                    buttonSize: "custom",
                    className: "w-fit !rounded-[40px] h-7 px-3 text-xs",
                  },
                }}
              >
                {key}
              </ResponsiveButton>
            ))}
          </div>
          {!isEditing && (
            <div className={cn("flex items-center justify-between", marginTop)}>
              <span className="font-regular text-gray-0 text-xs lg:text-sm">
                주방 프린터에 출력하기
              </span>
              <Switch className="h-5 w-10" />
            </div>
          )}
        </form>
      </Form>
    </section>
  );
}
