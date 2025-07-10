"use client";

import { SettingsIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { useStoreContext } from "@/providers/storeProvider";
import { useActiveCategory } from "../_hooks/useActiveCategory";
import { useMenuSort } from "../_hooks/useMenuSort";
import useSelectedCard from "../_hooks/useSelectedCard";
import HeaderButton from "./HeaderButton";
import RenderMenu from "./RenderMenu";

export default function MenuList() {
  const navigate = useRouter();

  const { storeId } = useStoreContext();
  const { isSelected, toggle, selectedCards } = useSelectedCard();
  const { active, categories, setActive } = useActiveCategory(storeId);
  const { handleSortSave, handleDragEnd } = useMenuSort(storeId, active);

  const [changeSort, setChangeSort] = useState(false);

  return (
    <div className="flex flex-1 flex-col pb-2 md:pt-4 lg:pt-6">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="scrollbar-hide md:overflow-none my-5 flex items-center gap-2 overflow-auto md:my-0 lg:gap-3">
          <ResponsiveButton
            color="grey"
            responsiveButtons={{
              lg: {
                buttonSize: "md",
                className:
                  "!text-[15px] !rounded-[12px] !p-0 !w-[32px] !h-[32px]",
              },
              md: {
                buttonSize: "sm",
                className: "h-8 !p-2 !rounded-[12px]",
              },
              sm: {
                buttonSize: "sm",
                className: "h-8 !p-2 !rounded-[12px]",
              },
            }}
            onClick={() => navigate.push(`/${storeId}/menu/category/add`)}
          >
            <SettingsIcon size={18} strokeWidth={1.5} />
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
              commonClassName={
                active === cat.categoryId ? "border-black" : "border-gray-300"
              }
              onClick={() => setActive(cat.categoryId)}
            >
              {cat.name}
            </ResponsiveButton>
          ))}
        </div>
        <HeaderButton
          selectedCards={selectedCards}
          categoryId={active}
          changeSort={changeSort}
          onSetChangeSort={setChangeSort}
          onSaveSort={handleSortSave}
        />
      </div>
      <RenderMenu
        changeSort={changeSort}
        categoryId={active}
        isSelected={isSelected}
        toggle={toggle}
        handleDragEnd={handleDragEnd}
      />
    </div>
  );
}
