"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/common/Form";
import Input from "@/components/common/Input";
import Label from "@/components/common/Label";
import { Button } from "@/components/common/NewButton";
import { getStoreCategoryList } from "@/lib/api/stores.api";
import { CategorySchema, TypeCategory } from "@/schema/store.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import usePostCategory from "../_hooks/usePostCategory";

interface EditCategoryFormProps {
  storeId: string;
}

export default function EditCategoryForm({ storeId }: EditCategoryFormProps) {
  const { data } = useQuery({
    queryKey: ["category-list", storeId],
    queryFn: () => getStoreCategoryList(storeId),
  });

  const { mutate: postCategory } = usePostCategory({ storeId });

  const form = useForm<TypeCategory>({
    resolver: zodResolver(CategorySchema),
    defaultValues: {
      name: "",
    },
    mode: "onChange",
  });

  const onSubmit = (formData: TypeCategory) => {
    postCategory(formData, {
      onSuccess: () => {
        form.reset();
      },
    });
  };

  return (
    <div className="mt-6 w-full md:mx-auto md:mt-8 md:w-[300px] lg:mt-[118px] lg:w-[480px]">
      <div className="flex flex-col gap-2">
        <h3 className="text-lg font-bold">카테고리</h3>
        <p className="text-xs text-gray-300">
          메뉴 카테고리를 등록하거나 수정할 수 있습니다.
          <br />
          카테고리는 메뉴 정렬 및 노출에 활용됩니다.
        </p>
      </div>
      <div className="mt-5 flex flex-col gap-3 lg:mt-10">
        {data?.categories.map((category, index) => (
          <div key={category.categoryId} className="flex flex-col gap-1">
            <Label>카테고리 {index + 1}</Label>
            <Input value={category.name} disabled className="mt-1" />
          </div>
        ))}
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Form {...form}>
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>
                    카테고리 {(data?.categories.length || 0) + 1}
                  </FormLabel>
                  <FormControl>
                    <Input {...field} type="text" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Form>
          <Button
            type="submit"
            size="xs"
            className="mt-5 w-full lg:mt-10 lg:h-[48px]"
          >
            추가
          </Button>
        </form>
      </div>
    </div>
  );
}
