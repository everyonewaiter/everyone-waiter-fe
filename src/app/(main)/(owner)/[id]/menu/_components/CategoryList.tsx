"use client";

import { getStoreCategoryList } from "@/lib/api/stores.api";
import { useQuery } from "@tanstack/react-query";
import { SettingsIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import MenuCategory from "./MenuCategory";
import NoneCategory from "./NoneCategory";

interface CategoryListProps {
  storeId: string;
}

export default function CategoryList({ storeId }: CategoryListProps) {
  const { data } = useQuery({
    queryKey: ["category-list", storeId],
    queryFn: () => getStoreCategoryList(storeId),
  });
  const pathname = usePathname();
  const isActive = pathname === `/${storeId}/menu`;
  console.log("카테고리 목록 : ", data?.categories);

  // 카테고리 존재하지 않는 경우
  if (!data || data.categories.length === 0) {
    return <NoneCategory storeId={storeId} />;
  }

  return (
    <div className="mt-5 flex flex-shrink-0 items-center gap-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
      <button
        type="button"
        onClick={() => {
          console.log("카테고리 설정 버튼 클릭");
        }}
        className="rounded-xl bg-[#f5f5f5] p-[10px]"
      >
        <SettingsIcon color="#999999" size={18} />
      </button>
      <Link
        href={`/${storeId}/menu`}
        className={`flex flex-shrink-0 items-center justify-between rounded-[8px] border px-4 py-2 text-[13px] ${
          isActive
            ? "bg-primary border-none text-white"
            : "border-gray-300 text-gray-300"
        } `}
      >
        전체
      </Link>
      {data?.categories.map((category) => (
        <MenuCategory
          key={category.categoryId}
          name={category.name}
          categoryId={category.categoryId}
          storeId={storeId}
        />
      ))}
    </div>
  );
}
