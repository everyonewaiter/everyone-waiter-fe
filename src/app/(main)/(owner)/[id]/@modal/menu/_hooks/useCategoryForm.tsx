import { useRef } from "react";
import { useForm } from "react-hook-form";

function useCategoryForm() {
  const form = useForm<{ categories: Category[] }>({
    defaultValues: { categories: [] },
  });

  const initialCategoriesRef = useRef<Category[]>([]);

  const setInitialCategories = (data: Category[]) => {
    form.reset({ categories: data });
    initialCategoriesRef.current = data;
  };

  return {
    form,
    initialCategoriesRef,
    setInitialCategories,
  };
}

export default useCategoryForm;
