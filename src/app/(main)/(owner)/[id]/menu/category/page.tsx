"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFieldArray, useForm } from "react-hook-form";
import { Plus } from "@/components/common/Icon/index";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { Form } from "@/components/common/Form";
import LabeledInput from "@/components/common/LabeledInput";
import Spinner from "@/components/common/Spinner";
import { useStoreContext } from "@/providers/storeProvider";
import { categoryQueries } from "../_queries/useCategories";
import { categorySchema, TypeCategory } from "../_schema/category.schema";

export default function Page() {
  const navigate = useRouter();
  const { storeId } = useStoreContext();

  const { data } = categoryQueries.useCategories(storeId);
  const addCategory = categoryQueries.useAddCategory();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<TypeCategory>({
    mode: "onChange",
    resolver: zodResolver(categorySchema),
    defaultValues: { categories: [] },
  });

  const hasInitialized = useRef(false);
  useEffect(() => {
    if (!hasInitialized.current && data?.categories) {
      form.reset({ categories: data.categories });
      hasInitialized.current = true;
    }
  }, [data?.categories, form]);

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "categories",
  });

  const submitHandler = async (formData: {
    categories: { name: string }[];
  }) => {
    try {
      setIsSubmitting(true);
      const promises = formData.categories
        .filter((category) => category.name)
        .map((category) =>
          addCategory.mutateAsync({ categoryName: category.name, storeId })
        );

      await Promise.all(promises);
      navigate.push(`/${storeId}/menu`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="h-full w-full">
      <div className="mt-10 flex w-full flex-col items-center overflow-y-scroll md:mt-5 md:h-[calc(100%-45px)] lg:mt-10 lg:h-[calc(100%-100px)]">
        <div className="w-80 md:w-120">
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
                    key={item.categoryId}
                    form={form}
                    label={`카테고리${index + 1}`}
                    name={`categories.${index}.name`}
                  />
                ))}

                <div className="flex flex-col gap-10">
                  <ResponsiveButton
                    type="button"
                    variant="outline"
                    color="grey"
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
                    commonClassName="dashed-light bg-white w-full text-gray-300 !font-medium"
                    onClick={() =>
                      append({
                        categoryId: String(form.watch("categories").length + 1),
                        name: "",
                      })
                    }
                    disabled={isSubmitting}
                  >
                    <Plus strokeWidth={1.5} size={18} />
                    <span>카테고리 추가</span>
                  </ResponsiveButton>
                  {fields.length > 0 && (
                    <ResponsiveButton
                      type="submit"
                      responsiveButtons={{
                        sm: {
                          buttonSize: "sm",
                          className: "mt-4 gap-2 items-center rounded-[12px]",
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
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? <Spinner /> : "확인"}
                    </ResponsiveButton>
                  )}
                </div>
              </form>
            </Form>
          </div>
        </div>
      </div>
    </div>
  );
}
