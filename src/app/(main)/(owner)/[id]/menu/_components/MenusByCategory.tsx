"use client";

import { getMenusByCategory } from "@/lib/api/stores.api";
import { useQuery } from "@tanstack/react-query";
import MenuList from "./MenuList";

interface MenusByCategoryProps {
  storeId: string;
  categoryId: string;
}

export default function MenusByCategory({
  storeId,
  categoryId,
}: MenusByCategoryProps) {
  const { data } = useQuery({
    queryKey: ["menus-by-category", storeId, categoryId],
    queryFn: () => getMenusByCategory(storeId, categoryId),
  });

  return <MenuList storeId={storeId} menus={data?.menus || []} />;
}
