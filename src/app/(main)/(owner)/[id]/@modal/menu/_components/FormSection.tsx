import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Dropdown from "@/components/common/Dropdown";
import { Form } from "@/components/common/Form";
import Label from "@/components/common/Label";
import LabeledInput from "@/components/common/LabeledInput";
import Switch from "@/components/common/Switch";
import cn from "@/lib/utils";
import { useFormContext } from "react-hook-form";
import Separator from "@/components/common/separator";
import formatPrice from "@/utils/format/price";
import { menuLabelTranslate, menuStateTranslate } from "@/constants/translates";
import { MenuFormType } from "./DetailMenuModal";
import useCategories from "../../../menu/_hooks/useCategories";

interface IProps {
  isEditing: boolean;
  storeId: string;
}

export default function FormSection({ isEditing, storeId }: IProps) {
  const { categoryListQuery } = useCategories(storeId);
  const categories = categoryListQuery.data?.categories;

  const form = useFormContext<MenuFormType>();

  const inputGap = "gap-1 lg:gap-2";
  const marginTop = "mt-2 lg:mt-4";

  return (
    <section className="flex h-full basis-[32.81%] rounded-[12px] border border-gray-600 p-4 lg:rounded-[24px] lg:p-6">
      <Form {...form}>
        <form
          className="flex w-full flex-col"
          // onSubmit={form.handleSubmit(submitHandler)}
        >
          <div className={cn("flex flex-col", inputGap)}>
            <Label disabled={!isEditing}>카테고리</Label>
            <Dropdown
              data={categories?.map((el) => el.name)!}
              defaultText={categories?.[0].name!}
              active={form?.watch("category")}
              setActive={(item: string) => form?.setValue("category", item)}
              disabled={!isEditing}
            />
          </div>
          <LabeledInput
            form={form}
            name="name"
            label="메뉴명"
            disabled={!isEditing}
            containerClassName={cn(inputGap, marginTop)}
            placeholder="메뉴명을 입력해주세요."
          />
          <LabeledInput
            form={form}
            name="description"
            label="메뉴 설명"
            disabled={!isEditing}
            containerClassName={cn(inputGap, marginTop)}
            placeholder="메뉴 설명을 입력해주세요."
          />
          <LabeledInput
            form={form}
            name="price"
            label="가격"
            disabled={!isEditing}
            containerClassName={cn(inputGap, marginTop)}
            placeholder="가격을 입력해주세요."
            onChange={(e) =>
              form?.setValue("price", formatPrice(Number(e.target.value)))
            }
          />
          <div className={cn("flex flex-col gap-2", marginTop)}>
            <Label>태그</Label>
            <div className="flex items-center gap-2">
              {["DEFAULT", "BEST", "RECOMMEND", "NEW"].map((key) => (
                <ResponsiveButton
                  key={key}
                  type="button"
                  variant="outline"
                  color={form.watch("label") === key ? "primary" : "grey"}
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
                  onClick={() => form.setValue("label", key as MenuLabel)}
                >
                  {menuLabelTranslate[key as keyof typeof menuLabelTranslate]}
                </ResponsiveButton>
              ))}
            </div>
            <Separator className="my-2 h-[2px] bg-gray-600" />
            <div className="flex items-center gap-2">
              {["🌶️", "🌶️🌶️", "🌶️🌶️🌶️"].map((key) => (
                <ResponsiveButton
                  key={key}
                  type="button"
                  variant="outline"
                  color={
                    form.watch("spicy") === key.length / 3 ? "primary" : "grey"
                  }
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
                  onClick={() => form.setValue("spicy", key.length / 3)}
                >
                  {key}
                </ResponsiveButton>
              ))}
            </div>
          </div>
          <div className={cn("flex flex-col gap-2", marginTop)}>
            <Label>상태</Label>
            <div className="flex items-center gap-2">
              {["DEFAULT", "HIDE", "SOLD_OUT"].map((key) => (
                <ResponsiveButton
                  key={key}
                  type="button"
                  variant="outline"
                  color={form.watch("state") === key ? "primary" : "grey"}
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
                  onClick={() => form.setValue("state", key as MenuState)}
                >
                  {menuStateTranslate[key as keyof typeof menuStateTranslate]}
                </ResponsiveButton>
              ))}
            </div>
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
