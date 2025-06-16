import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/common/Form";
import Input from "@/components/common/Input";
import Separator from "@/components/common/separator";
import { Minus, Plus } from "lucide-react";
import { useFieldArray, useForm } from "react-hook-form";

export default function OptionBox() {
  const form = useForm<{
    optionTitle: string;
    subOptions: { name: string; price: string }[];
  }>({
    mode: "onChange",
    defaultValues: {
      optionTitle: "",
      subOptions: [
        { name: "", price: "" },
        { name: "", price: "" },
        { name: "", price: "" },
      ],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "subOptions",
  });

  return (
    <div className="w-full rounded-[12px] border border-gray-600 p-3 lg:p-4">
      <Form {...form}>
        <form>
          <FormField
            control={form.control}
            name="optionTitle"
            render={({ field }) => (
              <FormItem className="w-full">
                <FormControl>
                  <Input
                    placeholder="옵션명을 입력해주세요."
                    className="placeholder:text-gray-300"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Separator className="my-3 h-[1px] bg-[#eee] lg:my-4" />
          <div className="flex flex-col gap-2 lg:gap-3">
            {fields.map((field, index) => (
              <div
                key={field.id}
                className="flex w-full items-center gap-1 lg:gap-2"
              >
                <FormField
                  control={form.control}
                  name={`subOptions.${index}.name`}
                  render={({ field: nameField }) => (
                    <FormItem className="flex w-full flex-1 lg:flex-[72]">
                      <FormControl>
                        <Input
                          placeholder="하위 옵션명을 입력해주세요."
                          className="placeholder:text-gray-300"
                          {...nameField}
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name={`subOptions.${index}.price`}
                  render={({ field: priceField }) => (
                    <FormItem className="relative flex w-full flex-1 lg:flex-[52.5]">
                      <FormControl>
                        <Input
                          placeholder="ex. 33,000"
                          className="!pr-10 placeholder:text-gray-300"
                          type="number"
                          {...priceField}
                        />
                      </FormControl>
                      <span className="absolute top-1/2 right-4 translate-y-[-50%] text-[15px] font-medium text-[#7c7c7c]">
                        원
                      </span>
                    </FormItem>
                  )}
                />
                <button
                  type="button"
                  className="flex p-1 lg:p-2"
                  onClick={() => remove(index)}
                >
                  <Minus
                    size={20}
                    className="text-gray-300 md:h-4 md:w-4 lg:h-5 lg:w-5"
                    strokeWidth={2}
                  />
                </button>
              </div>
            ))}
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
              onClick={() => append({ name: "", price: "" })}
            >
              하위 옵션 추가{" "}
              <Plus
                strokeWidth={1.5}
                size={16}
                className="md:h-3 md:w-3 lg:h-4 lg:w-4"
              />
            </ResponsiveButton>
          </div>
        </form>
      </Form>
    </div>
  );
}
