"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useStoreContext } from "@/providers/storeProvider";

export default function Page() {
  const navigate = useRouter();

  const { storeId } = useStoreContext();

  useEffect(() => {
    navigate.replace(`/${storeId}/menu/category/add`);
  }, [storeId, navigate]);

  return null;
}
