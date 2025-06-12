import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Dropdown from "@/components/common/Dropdown";
import { Form } from "@/components/common/Form";
import Label from "@/components/common/Label";
import LabeledInput from "@/components/common/LabeledInput";
import Switch from "@/components/common/Switch";
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

  return (
    <section className="flex basis-[32.81%] rounded-[24px] border border-gray-600 p-6">
      <Form {...form}>
        <form
          className="flex w-full flex-col gap-4"
          // onSubmit={form.handleSubmit(submitHandler)}
        >
          <div className="flex flex-col gap-2">
            <Label>상태</Label>
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
          />
          <LabeledInput
            form={form}
            name="description"
            label="메뉴 설명"
            disabled={!isEditing}
            containerClassName="gap-2"
          />
          <LabeledInput
            form={form}
            name="price"
            label="가격"
            disabled={!isEditing}
            containerClassName="gap-2"
          />
          <div className="flex flex-col gap-2">
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
                }}
              >
                {key}
              </ResponsiveButton>
            ))}
          </div>
          <div className="flex flex-col gap-2">
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
                }}
              >
                {key}
              </ResponsiveButton>
            ))}
          </div>
          {!isEditing && (
            <div className="flex items-center justify-between">
              <span className="font-regular text-gray-0 text-sm">
                주방 프린터에 출력하기
              </span>
              <Switch />
            </div>
          )}
        </form>
      </Form>
    </section>
  );
}
