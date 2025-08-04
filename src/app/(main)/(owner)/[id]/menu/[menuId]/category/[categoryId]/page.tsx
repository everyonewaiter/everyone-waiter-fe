"use client";

import { useStoreContext } from "@/providers/storeProvider";
import { useRouter, useParams, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Page() {
  const navigate = useRouter();
  const params = useParams();
  const searchParams = useSearchParams();

  const menuId = params?.menuId;
  const categoryId = searchParams.get("categoryId");

  const { storeId } = useStoreContext();

  useEffect(() => {
    if (categoryId) {
      navigate.replace(`/${storeId}/menu/${menuId}?categoryId=${categoryId}`);
    }
  }, [menuId, categoryId, navigate, storeId]);

  return null;
}
