"use client";

import { useStoreContext } from "@/providers/storeProvider";
import PageTitle from "@/app/(main)/_components/PageTitle/PageTitle";
import PAGE_TITLES from "@/constants/pageTitles";
import Spinner from "@/components/common/Spinner";
import GuideAddCategory from "./_components/GuideAddCategory";
import MenuList from "./_components/MenuList";
import { categoryQueries } from "./_queries/useCategories";

export default function Page() {
  const { storeId } = useStoreContext();

  const { data, isLoading } = categoryQueries.useCategories(storeId);

  return (
    <div className="scrollbar-hide flex h-full flex-col">
      {isLoading && <Spinner />}
      {data?.categories?.length! > 0 ? (
        <>
          <PageTitle initialTitle={PAGE_TITLES.OWNER.menu} storeId={storeId} />
          <div className="relative flex h-full w-full flex-col">
            <MenuList />
          </div>
        </>
      ) : (
        <div className="center flex h-full w-full">
          <GuideAddCategory />
        </div>
      )}
    </div>
  );
}
