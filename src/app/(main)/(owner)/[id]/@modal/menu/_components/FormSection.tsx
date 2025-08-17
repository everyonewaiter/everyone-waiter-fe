import { Separator } from "@radix-ui/react-dropdown-menu";
import { Controller, useFormContext } from "react-hook-form";
import { useEffect } from "react";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Dropdown from "@/components/common/Dropdown";
import Label from "@/components/common/Label";
import LabeledInput from "@/components/common/LabeledInput";
import Switch from "@/components/common/Switch";
import { menuLabelTranslate, menuStateTranslate } from "@/constants/translates";
import cn from "@/lib/utils";
import Input from "@/components/common/Input";
import { FormErrorMessage } from "@/components/common/Form";
import { categoryQueries } from "../../../menu/_queries/useCategories";
import { TypeMenuForm } from "../../../menu/_schema/menu.schema";

interface IProps {
  isEditing: boolean;
  storeId: string;
  type: "create" | "update";
}

export default function FormSection({ isEditing, storeId, type }: IProps) {
  const { data } = categoryQueries.useCategories(storeId);

  const form = useFormContext<TypeMenuForm>();

  const inputGap = "gap-1 lg:gap-2";
  const marginTop = "mt-2 lg:mt-4";

  useEffect(() => {
    form.register("label");
    form.register("state");
    form.register("spicy");
    form.register("printEnabled");

    if (form.getValues("label") == null) {
      form.setValue("label", "DEFAULT");
    }
    if (form.getValues("state") == null) {
      form.setValue("state", "DEFAULT");
    }
    if (form.getValues("spicy") == null) {
      form.setValue("spicy", 1);
    }
    if (form.getValues("printEnabled") == null) {
      form.setValue("printEnabled", true);
    }
  }, [form]);

  const labelValue =
    form.watch("label") ?? form.getValues("label") ?? "DEFAULT";
  const stateValue =
    form.watch("state") ?? form.getValues("state") ?? "DEFAULT";
  const spicyValue = form.watch("spicy") ?? form.getValues("spicy") ?? 1;
  const printEnabledValue =
    form.watch("printEnabled") ?? form.getValues("printEnabled") ?? true;

  const getCategoryName = () =>
    data?.categories?.find((el) => el.categoryId === form.watch("category"))
      ?.name;

  return (
    <section className="flex h-fit basis-[32.81%] rounded-[12px] border border-gray-600 p-4 lg:rounded-[24px] lg:p-6">
      <div className="flex w-full flex-col gap-2">
        <div className={cn("flex flex-col", inputGap)}>
          <Label disabled={!isEditing} className="mb-1">
            카테고리
          </Label>
          <Dropdown
            data={data?.categories?.map((el) => el.name) ?? []}
            defaultText={
              getCategoryName() ??
              data?.categories?.[0]?.name ??
              "카테고리를 선택하세요"
            }
            active={getCategoryName() ?? ""}
            setActive={(name: string) => {
              const id = data?.categories?.find(
                (el) => el.name === name
              )?.categoryId;
              if (id) {
                form.setValue("category", id);
              }
            }}
            disabled={type !== "create"}
            triggerClassName="justify-between lg:rounded-[12px] md:rounded-[8px]"
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
        <div className="mt-1 flex flex-col gap-2">
          <Label disabled={!isEditing}>가격</Label>
          <Controller
            name="price"
            control={form.control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="가격을 입력해주세요."
                onChange={(e) => {
                  const digitsOnly = e.target.value.replace(/[^0-9]/g, "");
                  if (digitsOnly === "" || digitsOnly === "0") {
                    form.setValue("price", "");
                    return;
                  }
                  const numeric = Number(digitsOnly);
                  form.setValue("price", numeric.toLocaleString());
                }}
                disabled={!isEditing}
                hasError={!!form.formState.errors.price}
              />
            )}
          />
          <FormErrorMessage>
            {form.formState.errors.price?.message?.toString()}
          </FormErrorMessage>
        </div>
        <div className={cn("flex flex-col gap-2", marginTop)}>
          <Label>태그</Label>
          <div className="flex items-center gap-2">
            {["DEFAULT", "BEST", "RECOMMEND", "NEW"].map((key) => (
              <ResponsiveButton
                key={key}
                type="button"
                variant="outline"
                color={labelValue === key ? "primary" : "grey"}
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
                onClick={() =>
                  isEditing
                    ? form.setValue(
                        "label",
                        key as "DEFAULT" | "BEST" | "NEW" | "RECOMMEND"
                      )
                    : null
                }
              >
                {menuLabelTranslate[key as keyof typeof menuLabelTranslate]}
              </ResponsiveButton>
            ))}
          </div>
          {type === "update" && (
            <>
              <Separator className="my-2 h-[2px] bg-gray-600" />
              <div className="flex items-center gap-2">
                {["🌶️", "🌶️🌶️", "🌶️🌶️🌶️"].map((key) => (
                  <ResponsiveButton
                    key={key}
                    type="button"
                    variant="outline"
                    color={spicyValue === key.length / 3 ? "primary" : "grey"}
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
                    onClick={() =>
                      isEditing ? form.setValue("spicy", key.length / 3) : null
                    }
                  >
                    {key}
                  </ResponsiveButton>
                ))}
              </div>
            </>
          )}
        </div>
        <div className={cn("flex flex-col gap-2", marginTop)}>
          <Label>상태</Label>
          <div className="flex items-center gap-2">
            {["DEFAULT", "HIDE", "SOLD_OUT"].map((key) => (
              <ResponsiveButton
                key={key}
                type="button"
                variant="outline"
                color={stateValue === key ? "primary" : "grey"}
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
                onClick={() =>
                  isEditing ? form.setValue("state", key as MenuState) : null
                }
              >
                {menuStateTranslate[key as keyof typeof menuStateTranslate]}
              </ResponsiveButton>
            ))}
          </div>
        </div>
        <div className={cn("flex items-center justify-between", marginTop)}>
          <span className="font-regular text-gray-0 text-xs lg:text-sm">
            주방 프린터에 출력하기
          </span>
          <Switch
            className="h-5 w-10"
            checked={printEnabledValue}
            onCheckedChange={(checked) =>
              form.setValue("printEnabled", checked)
            }
            disabled={!isEditing}
          />
        </div>
      </div>
    </section>
  );
}
