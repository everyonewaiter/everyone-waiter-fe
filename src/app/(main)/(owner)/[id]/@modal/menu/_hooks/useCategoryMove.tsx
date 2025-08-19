import { useCallback, useEffect, useRef } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  categoryFormSchema,
  TypeCategoryForm,
} from "../../../menu/_schema/category.schema";
import { categoryQueries } from "../../../menu/_queries/useCategories";

export default function useCategoryMove(storeId: string) {
  const initialRef = useRef<TypeCategoryForm["categories"]>([]);

  const form = useForm<TypeCategoryForm>({
    mode: "onChange",
    resolver: zodResolver(categoryFormSchema),
    defaultValues: { categories: [] },
  });

  const { data: categories } = categoryQueries.useCategories(storeId);

  const setInit = useCallback(
    (data: TypeCategoryForm["categories"]) => {
      form.reset({ categories: data });
      initialRef.current = data;
    },
    [form]
  );

  useEffect(() => {
    if (categories) {
      setInit(
        categories?.categories.map((el) => ({
          ...el,
          isAdded: false,
          isUpdated: false,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categories]);

  return {
    form,
    setInit,
    initialRef,
  };
}
