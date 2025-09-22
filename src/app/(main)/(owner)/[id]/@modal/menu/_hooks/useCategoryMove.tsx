import { useCallback, useEffect, useRef, useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  categoryFormSchema,
  TypeCategoryForm,
} from "../../../menu/_schema/category.schema";
import { categoryQueries } from "../../../menu/_queries/useCategories";

export default function useCategoryMove(storeId: string) {
  const initialRef = useRef<TypeCategoryForm["categories"]>([]);

  const { data: categories } = categoryQueries.useCategories(storeId);

  const form = useForm<TypeCategoryForm>({
    mode: "onChange",
    resolver: zodResolver(categoryFormSchema),
    defaultValues: { categories: [] },
  });

  const [items, setItems] = useState<TypeCategoryForm["categories"]>([]);

  useEffect(() => {
    setItems(form.watch("categories"));
    // eslint-disable-next-line
  }, [form.watch("categories")]);

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
        categories?.categories?.map((el) => ({
          ...el,
          isAdded: false,
          isUpdated: false,
        }))
      );
    }
    // eslint-disable-next-line
  }, [categories]);

  return {
    form,
    setInit,
    initialRef,
    categories,
    items,
    setItems,
  };
}
