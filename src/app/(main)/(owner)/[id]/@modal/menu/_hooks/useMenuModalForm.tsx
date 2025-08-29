"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  menuFormSchema,
  TypeMenuForm,
} from "../../../menu/_schema/menu.schema";

export default function useMenuModalForm({
  data,
  initialCategoryId,
}: {
  data?: MenuDetail;
  initialCategoryId?: string;
}) {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const form = useForm<TypeMenuForm>({
    mode: "onSubmit",
    resolver: zodResolver(menuFormSchema),
    defaultValues: {
      imgFile: undefined as unknown as File,
      imgString: "",
      category: initialCategoryId ?? "",
      name: "",
      description: "",
      price: "",
      spicy: 1,
      state: "DEFAULT",
      label: "DEFAULT",
      printEnabled: true,
      requiredOptions: [],
      optionalOptions: [],
    },
  });

  useEffect(() => {
    // Avoid resetting while a submit is in-flight to prevent UI flicker/reorder revert
    if (form.formState.isSubmitting) return;
    if (data?.menuId) {
      form.reset({
        category: data.categoryId,
        name: data.name,
        description: data.description,
        price: (data.price ?? 0).toLocaleString(),
        spicy: data.spicy,
        state: data.state,
        label: data.label!,
        imgString: data.image,
        requiredOptions: data.menuOptionGroups?.filter(
          (el) => el.type === "MANDATORY"
        ),
        optionalOptions: data.menuOptionGroups?.filter(
          (el) => el.type === "OPTIONAL"
        ),
        printEnabled: data.printEnabled!,
      });
    }
  }, [data, form]);

  useEffect(() => {
    if (form.watch("category") || !categoryId) return;
    form.setValue("category", categoryId);
  }, [categoryId, form]);

  return {
    form,
  };
}
