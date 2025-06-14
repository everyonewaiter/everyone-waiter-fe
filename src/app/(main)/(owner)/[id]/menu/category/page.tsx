"use client";

import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { Form } from "@/components/common/Form";
import LabeledInput from "@/components/common/LabeledInput";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { useFieldArray, useForm } from "react-hook-form";
import { useEffect } from "react";
import useCategoryStore from "../_hooks/useCategoryStore";

export default function Page() {
  const navigate = useRouter();
  const params = useParams();
  const storeId = params?.id as string;

  const { categories } = useCategoryStore();

  const form = useForm<{ categories: { name: string }[] }>({
    defaultValues: { categories },
  });

  useEffect(() => {
    form.reset({ categories });
  }, [categories, form]);

  const { fields } = useFieldArray({
    control: form.control,
    name: "categories",
  });

  const submitHandler = () => {};

  return (
    <div className="h-full w-full">
      <div className="mt-10 flex w-full flex-col items-center overflow-y-scroll md:mt-5 md:h-[calc(100%-45px)] lg:mt-10 lg:h-[calc(100%-100px)]">
        <div className="w-80 md:w-[272px] lg:w-120">
          <h1 className="text-gray-0 text-lg font-semibold lg:text-2xl">
            카테고리
          </h1>
          <div className="md:text-s font-regular gap-1/2 mt-2 flex flex-col text-xs text-gray-300 lg:mt-3 lg:text-sm">
            <span>메뉴 카테고리를 등록하거나 수정할 수 있습니다.</span>
            <span>카테고리는 메뉴 정렬 및 노출에 활용됩니다.</span>
          </div>
          <div className="my-8 flex flex-col md:my-6 lg:my-10">
            <Form {...form}>
              <form
                className="flex flex-col gap-3 lg:gap-4"
                onSubmit={form.handleSubmit(submitHandler)}
              >
                {fields?.map((item, index) => (
                  <LabeledInput
                    key={item.name}
                    form={form}
                    label={`카테고리${index + 1}`}
                    name={`categories.${index}.name`}
                    readOnly
                  />
                ))}

                <div>
                  <ResponsiveButton
                    type="button"
                    responsiveButtons={{
                      sm: {
                        buttonSize: "sm",
                        className:
                          "flex mt-4 gap-2 items-center rounded-[12px]",
                      },
                      md: {
                        buttonSize: "sm",
                        className: "gap-1 !text-s",
                      },
                      lg: {
                        buttonSize: "lg",
                        className: "mt-8",
                      },
                    }}
                    commonClassName="dashed-light bg-white border-none w-full text-gray-300 !font-medium"
                    onClick={() =>
                      navigate.push(`/${storeId}/menu/category/add`)
                    }
                  >
                    <Plus strokeWidth={1.5} size={18} />
                    <span>카테고리 추가</span>
                  </ResponsiveButton>
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
