"use client";

import { useParams } from "next/navigation";
import MenuList from "./_components/MenuList";
import GuideAddCategory from "./_components/GuideAddCategory";
import useCategories from "./_hooks/useCategories";

export default function Page() {
  const params = useParams();
  const storeId = params?.id as string;

  const { categoryListQuery } = useCategories(storeId);
  const data = categoryListQuery.data?.categories;

  return (
    <div className="flex flex-1">
      {data?.length! > 0 ? (
        <MenuList storeId={storeId} />
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <GuideAddCategory />
        </div>
      )}
    </div>
  );
}
