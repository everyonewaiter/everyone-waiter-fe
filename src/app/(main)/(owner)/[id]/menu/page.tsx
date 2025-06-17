"use client";

import { useStoreContext } from "@/providers/storeProvider";
import MenuList from "./_components/MenuList";
import GuideAddCategory from "./_components/GuideAddCategory";
import { useCategoryListQuery } from "./_queries/useCategoryQuery";

export default function Page() {
  const { storeId } = useStoreContext();

  const data = useCategoryListQuery(storeId).data?.categories;

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
