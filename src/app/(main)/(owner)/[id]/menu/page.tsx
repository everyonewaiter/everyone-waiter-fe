"use client";

import { useStoreContext } from "@/providers/storeProvider";
import GuideAddCategory from "./_components/GuideAddCategory";
import MenuList from "./_components/MenuList";
import { categoryQueries } from "./_queries/useCategories";

export default function Page() {
  const { storeId } = useStoreContext();

  const { data } = categoryQueries.useCategories(storeId);

  return data?.categories?.length! > 0 ? (
    <MenuList />
  ) : (
    <div className="flex min-h-screen flex-1 items-center justify-center">
      <GuideAddCategory />
    </div>
  );
}
