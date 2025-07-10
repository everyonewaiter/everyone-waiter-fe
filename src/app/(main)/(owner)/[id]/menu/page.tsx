"use client";

import { useStoreContext } from "@/providers/storeProvider";
import GuideAddCategory from "./_components/GuideAddCategory";
import MenuList from "./_components/MenuList";
import useCategories from "./_queries/useCategories";

export default function Page() {
  const { storeId } = useStoreContext();

  const { query } = useCategories(storeId);
  const data = query.data?.categories;

  return (
    <div className="flex flex-1">
      {data?.length! > 0 ? (
        <MenuList />
      ) : (
        <div className="flex flex-1 items-center justify-center">
          <GuideAddCategory />
        </div>
      )}
    </div>
  );
}
