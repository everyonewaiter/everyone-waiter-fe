"use client";

import { getStoreCategoryList } from "@/lib/api/stores.api";
import { useQuery } from "@tanstack/react-query";

interface CategoryListProps {
  storeId: string;
}

export default function CategoryList({ storeId }: CategoryListProps) {
  const { data } = useQuery({
    queryKey: ["category-list", storeId],
    queryFn: () => getStoreCategoryList(storeId),
  });

  console.log(data);

  return (
    <div>
      <h1>카테고리 목록</h1>
      {data?.categories.length === 0 ? (
        <div>카테고리 등록 필요</div>
      ) : (
        data?.categories.map((category) => (
          <div key={category.categoryId}>
            <h2>{category.name}</h2>
          </div>
        ))
      )}
    </div>
  );
}
