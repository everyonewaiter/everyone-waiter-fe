"use client";

import { useStoreContext } from "@/providers/storeProvider";
import GuideAddCategory from "./_components/GuideAddCategory";
import MenuList from "./_components/MenuList";
import useCategories from "./_queries/useCategories";

export default function Page() {
  const { storeId } = useStoreContext();

  const { categories } = useCategories(storeId);
  const { data } = categories(storeId);

  return (
    <div className="flex flex-1">
      {data?.categories?.length! > 0 ? (
        <MenuList />
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <GuideAddCategory />
        </div>
      )}
    </div>
  );
}
