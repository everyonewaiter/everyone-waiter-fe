import dynamic from "next/dynamic";
import { useFormContext } from "react-hook-form";
import { Form } from "@/components/common/Form";
import { TypeCategoryForm } from "../_schema/category.schema";

const CategoryFormField = dynamic(() => import("./CategoryFormField"), {
  ssr: false,
});

interface IProps {
  changeMove: boolean;
}

export default function CategoryForm({ changeMove }: IProps) {
  const form = useFormContext<TypeCategoryForm>();

  return (
    <Form {...form}>
      <div className="flex flex-col md:gap-3 lg:gap-4">
        {form.watch("categories") ? (
          form
            .watch("categories")
            ?.map((field) => (
              <CategoryFormField
                key={field.categoryId}
                changeMove={changeMove}
                {...field}
              />
            ))
        ) : (
          <div className="center h-full w-full">카테고리를 추가해주세요!</div>
        )}
      </div>
    </Form>
  );
}
