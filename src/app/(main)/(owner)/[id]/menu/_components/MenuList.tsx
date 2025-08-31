"use client";

import { useRouter } from "next/navigation";
import { Suspense, useState } from "react";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { useStoreContext } from "@/providers/storeProvider";
import cn from "@/lib/utils";
import { SettingsIcon } from "@/components/common/Icon/index";
import { useActiveCategory } from "../_hooks/useActiveCategory";
import { useMenuSort } from "../_hooks/useMenuSort";
import HeaderButton from "./HeaderButton";
import RenderMenu from "./RenderMenu";
import MenuLoadingSkeleton from "./MenuLoadingSkeleton";

export default function MenuList() {
  const navigate = useRouter();

  const { storeId } = useStoreContext();
  const { active, categories, setActive } = useActiveCategory(storeId);
  const { form, handleSortSave, handleDragEnd } = useMenuSort(storeId, active);

  const [isNavigating, setIsNavigating] = useState(false);
  const [changeSort, setChangeSort] = useState(false);

  const getBorderClass = (categoryId: string) => {
    if (changeSort) return "border-gray-300 bg-transparent";
    if (active === categoryId) return "border-black";
    return "border-gray-300";
  };

  return (
    <div className="flex flex-col pb-2 md:pt-4 lg:pt-6">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="scrollbar-hide md:overflow-none my-5 flex items-center gap-2 overflow-auto md:my-0 lg:gap-3">
          <ResponsiveButton
            color="grey"
            responsiveButtons={{
              lg: {
                buttonSize: "md",
                className: "!text-[15px] !rounded-xl !p-0 !w-[32px] !h-[32px]",
              },
              md: {
                buttonSize: "sm",
                className: "h-8 !p-2 !rounded-xl",
              },
              sm: {
                buttonSize: "sm",
                className: "h-8 !p-2 !rounded-xl",
              },
            }}
            onClick={() => {
              setIsNavigating(true);
              navigate.push(`/${storeId}/menu/category/add`);
            }}
            aria-label="카테고리 등록 및 수정"
            disabled={changeSort}
          >
            <SettingsIcon
              size={18}
              strokeWidth={1.5}
              className={cn(isNavigating && "animate-spin")}
            />
          </ResponsiveButton>
          {categories?.map((cat) => (
            <ResponsiveButton
              key={cat.categoryId}
              variant={active === cat.categoryId ? "default" : "outline"}
              color={active === cat.categoryId ? "black" : "grey"}
              responsiveButtons={{
                lg: {
                  buttonSize: "md",
                  className: "h-10 !text-[15px]",
                },
                md: { buttonSize: "sm" },
                sm: { buttonSize: "sm" },
              }}
              commonClassName={getBorderClass(cat.categoryId)}
              onClick={() => setActive(cat.categoryId)}
              disabled={changeSort}
            >
              {cat.name}
            </ResponsiveButton>
          ))}
        </div>
        <HeaderButton
          categoryId={active}
          changeSort={changeSort}
          onSetChangeSort={setChangeSort}
          onSaveSort={() => handleSortSave(() => setChangeSort(false))}
        />
      </div>
      <Suspense fallback={<MenuLoadingSkeleton />}>
        <RenderMenu
          changeSort={changeSort}
          categoryId={active}
          handleDragEnd={handleDragEnd}
          sortedMenus={form.watch("menus")}
        />
      </Suspense>
    </div>
  );
}
