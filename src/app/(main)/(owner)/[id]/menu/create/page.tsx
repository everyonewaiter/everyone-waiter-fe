"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { useStoreContext } from "@/providers/storeProvider";

export default function Page() {
  const navigate = useRouter();
  const categoryId = useSearchParams().get("categoryId");

  const { storeId } = useStoreContext();

  useEffect(() => {
    if (categoryId) {
      navigate.replace(
        `/${storeId}/menu/create${categoryId ? `?categoryId=${categoryId}` : ""}`
      );
    }
  }, [categoryId, storeId, navigate]);

  return null;
}
