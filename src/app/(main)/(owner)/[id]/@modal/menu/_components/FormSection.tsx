import { Separator } from "@radix-ui/react-dropdown-menu";
import { useFormContext } from "react-hook-form";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Dropdown from "@/components/common/Dropdown";
import Label from "@/components/common/Label";
import LabeledInput from "@/components/common/LabeledInput";
import Switch from "@/components/common/Switch";
import { menuLabelTranslate, menuStateTranslate } from "@/constants/translates";
import cn from "@/lib/utils";
import useCategories from "../../../menu/_queries/useCategories";
import { MenuFormType } from "../_types/menuForm.type";

interface IProps {
  isEditing: boolean;
  storeId: string;
  type: "create" | "update";
}

export default function FormSection({ isEditing, storeId, type }: IProps) {
  const { query } = useCategories(storeId);
  const categories = query.data?.categories;

  const form = useFormContext<
    Omit<MenuFormType, "image"> & { image: File | string | null }
  >();

  const inputGap = "gap-1 lg:gap-2";
  const marginTop = "mt-2 lg:mt-4";

  const getCategoryName = () =>
    categories?.find((el) => el.categoryId === form.watch("category"))?.name;

  return (
    <section className="flex h-fit basis-[32.81%] rounded-[12px] border border-gray-600 p-4 lg:rounded-[24px] lg:p-6">
      <form
        className="flex w-full flex-col"
        // onSubmit={form.handleSubmit(submitHandler)}
      >
        <div className={cn("flex flex-col", inputGap)}>
          <Label disabled={!isEditing}>카테고리</Label>
          <Dropdown
            data={categories?.map((el) => el.name) ?? []}
            defaultText={
              getCategoryName() ??
              categories?.[0]?.name ??
              "카테고리를 선택하세요"
            }
            active={getCategoryName() ?? ""}
            setActive={(name: string) => {
              const id = categories?.find((el) => el.name === name)?.categoryId;
              if (id) {
                form.setValue("category", id);
              }
            }}
            // TODO: 추후 수정
            disabled={type !== "create"}
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
          onChange={(e) => form?.setValue("price", Number(e.target.value))}
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
                onClick={() =>
                  isEditing ? form.setValue("label", key as MenuLabel) : null
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
                    color={
                      form.watch("spicy") === key.length / 3
                        ? "primary"
                        : "grey"
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
          <Switch className="h-5 w-10" />
        </div>
      </form>
    </section>
  );
}
