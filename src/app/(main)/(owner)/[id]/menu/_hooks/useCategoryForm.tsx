import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useRef, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import { categorySchema, TypeCategory } from "../_schema/category.schema";
import { categoryQueries } from "../_queries/useCategories";

export default function useCategoryForm(storeId: string) {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data } = categoryQueries.useCategories(storeId);
  const addCategory = categoryQueries.useAddCategory();

  const form = useForm<TypeCategory>({
    mode: "onChange",
    resolver: zodResolver(categorySchema),
    defaultValues: { categories: [] },
  });

  const { fields, append } = useFieldArray({
    control: form.control,
    name: "categories",
  });

  const initializedRef = useRef(false);

  useEffect(() => {
    if (!initializedRef.current && data?.categories) {
      form.reset({ categories: data.categories });
      initializedRef.current = true;
    }
  }, [data?.categories, form]);

  const submitHandler = async (
    formData: TypeCategory,
    navigateHandler: () => void
  ) => {
    try {
      setIsSubmitting(true);
      const toCreate = formData.categories.filter((category) => category.name);
      for (let i = 0; i < toCreate.length; i += 1) {
        // eslint-disable-next-line no-await-in-loop
        await addCategory.mutateAsync({
          categoryName: toCreate[i].name,
          storeId,
        });
      }
      navigateHandler();
    } finally {
      setIsSubmitting(false);
    }
  };

  return { form, fields, append, submitHandler, isSubmitting };
}
