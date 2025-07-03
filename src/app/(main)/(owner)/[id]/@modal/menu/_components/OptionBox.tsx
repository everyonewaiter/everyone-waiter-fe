import { Minus, Plus } from "lucide-react";
import { useFieldArray, useFormContext } from "react-hook-form";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import {
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/common/Form";
import Input from "@/components/common/Input";
import Separator from "@/components/common/separator";
import { MenuFormType } from "../_types/menuForm.type";

interface IProps {
  type: "requiredOptions" | "optionalOptions";
  index: number;
  isEditing: boolean;
}

export default function OptionBox({ type, index, isEditing }: IProps) {
  const form = useFormContext<
    Omit<MenuFormType, "image"> & { image: File | null }
  >();

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: `${type}.${index}.menuOptions`,
  });

  return (
    <div className="w-full rounded-[12px] border border-gray-600 p-3 lg:p-4">
      <form>
        <FormField
          control={form.control}
          name={`${type}.${index}.name`}
          render={({ field }) => (
            <FormItem className="w-full">
              <FormControl>
                <Input
                  placeholder="옵션명을 입력해주세요."
                  className="placeholder:text-gray-300"
                  disabled={!isEditing}
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Separator className="my-3 h-[1px] bg-[#eee] lg:my-4" />
        <div className="flex flex-col gap-2 lg:gap-3">
          {fields.map((field, i) => (
            <div
              key={field.id}
              className="flex w-full items-center gap-1 lg:gap-2"
            >
              <FormField
                control={form.control}
                name={`${type}.${index}.menuOptions.${i}.name`}
                render={({ field: nameField }) => (
                  <FormItem className="flex w-full flex-1 lg:flex-[72]">
                    <FormControl>
                      <Input
                        placeholder="하위 옵션명을 입력해주세요."
                        className="placeholder:text-gray-300"
                        disabled={!isEditing}
                        {...nameField}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name={`${type}.${index}.menuOptions.${i}.price`}
                render={({ field: priceField }) => (
                  <FormItem className="relative flex w-full flex-1 lg:flex-[52.5]">
                    <FormControl>
                      <Input
                        placeholder="ex. 33,000"
                        className="!pr-10 placeholder:text-gray-300"
                        type="number"
                        disabled={!isEditing}
                        {...priceField}
                      />
                    </FormControl>
                    <span className="absolute top-1/2 right-4 translate-y-[-50%] text-[15px] font-medium text-[#7c7c7c]">
                      원
                    </span>
                  </FormItem>
                )}
              />
              {isEditing && (
                <button
                  type="button"
                  className="flex p-1 lg:p-2"
                  onClick={() => remove(i)}
                >
                  <Minus
                    size={20}
                    className="text-gray-300 md:h-4 md:w-4 lg:h-5 lg:w-5"
                    strokeWidth={2}
                  />
                </button>
              )}
            </div>
          ))}
          {isEditing && (
            <ResponsiveButton
              type="button"
              color="grey"
              responsiveButtons={{
                lg: {
                  buttonSize: "custom",
                  className:
                    "w-full h-8 rounded-[8px] text-center border-gray-600 text-sm text-gray-0",
                },
                md: {
                  buttonSize: "custom",
                  className:
                    "w-full h-8 rounded-[8px] text-center border-gray-600 text-xs text-gray-0 flex gap-1",
                },
              }}
              onClick={() => append({ name: "", price: 0 })}
            >
              하위 옵션 추가{" "}
              <Plus
                strokeWidth={1.5}
                size={16}
                className="md:h-3 md:w-3 lg:h-4 lg:w-4"
              />
            </ResponsiveButton>
          )}
        </div>
      </form>
    </div>
  );
}
