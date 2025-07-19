"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  menuFormSchema,
  TypeMenuForm,
} from "../../../menu/_schema/menu.schema";

export default function useMenuModalForm(data?: MenuDetail) {
  const searchParams = useSearchParams();
  const categoryId = searchParams.get("categoryId");

  const form = useForm<TypeMenuForm>({
    mode: "onChange",
    resolver: zodResolver(menuFormSchema),
  });

  useEffect(() => {
    if (!data?.menuId) return;

    form.reset({
      category: data.categoryId,
      name: data.name,
      description: data.description,
      price: data.price,
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
  }, [data, form]);

  useEffect(() => {
    if (form.watch("category") || !categoryId) return;
    form.setValue("category", categoryId);
  }, [categoryId, form]);

  return {
    form,
  };
}
