"use client";

import { getStoreCategoryList } from "@/lib/api/stores.api";
import { useQuery } from "@tanstack/react-query";
import NoneCategory from "./NoneCategory";

interface CategoryListProps {
  storeId: string;
}

export default function CategoryList({ storeId }: CategoryListProps) {
  const { data } = useQuery({
    queryKey: ["category-list", storeId],
    queryFn: () => getStoreCategoryList(storeId),
  });

  console.log(data);

  if (!data || data.categories.length === 0) {
    return <NoneCategory storeId={storeId} />;
  }

  return (
    <div>
      {data?.categories.map((category) => (
        <div key={category.categoryId}>
          <h2>{category.name}</h2>
        </div>
      ))}
    </div>
  );
}
