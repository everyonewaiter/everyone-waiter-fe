"use client";

import { getMenusWithCategory } from "@/lib/api/stores.api";
import { useQuery } from "@tanstack/react-query";

import MenuList from "./MenuList";

interface AllMenuProps {
  storeId: string;
}

export default function AllMenu({ storeId }: AllMenuProps) {
  const { data } = useQuery({
    queryKey: ["menus-with-category", storeId],
    queryFn: () => getMenusWithCategory(storeId),
  });
  // 메뉴만 뽑아내기
  const allMenus = data?.categories.flatMap((category) => category.menus) || [];

  return <MenuList storeId={storeId} menus={allMenus} />;
}
