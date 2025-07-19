import { useCallback, useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  categoryFormSchema,
  TypeCategoryForm,
} from "../../../menu/_schema/category.schema";
import { categoryQueries } from "../../../menu/_queries/useCategories";

function useCategoryForm(storeId: string) {
  const { data, isLoading } = categoryQueries.useCategories(storeId);

  const form = useForm<TypeCategoryForm>({
    mode: "onChange",
    resolver: zodResolver(categoryFormSchema),
    defaultValues: { categories: [] },
  });

  const initialCategoriesRef = useRef<Category[]>([]);

  const setInitialCategories = useCallback(
    (categories: Category[]) => {
      form.reset({ categories });
      initialCategoriesRef.current = categories;
    },
    [form, initialCategoriesRef]
  );

  useEffect(() => {
    if (data) {
      setInitialCategories(data?.categories);
    }
  }, [data, form]);

  return {
    form: { form, ...form },
    isLoadinCategories: isLoading,
    initialCategoriesRef,
    setInitialCategories,
  };
}

export default useCategoryForm;
