"use client";

import { lazy, useState } from "react";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import { PlusIcon } from "@/components/common/Icon/index";
import DashedBorder from "@/components/DashedBorder";
import { useStoreContext } from "@/providers/storeProvider";
import { rectSortingStrategy } from "@/components/dnd";
import Loading from "@/components/Loading";
import { TypeMenuList } from "../_schema/menu.schema";
import { menuQueries } from "../_queries/useMenu";
import MenuCard from "./MenuCard";
import { useMenuSelection } from "../_stores/useMenuSelection";

const Sortable = lazy(() => import("@/components/Sortable"));
const SortableItem = lazy(() => import("./SortableItem"));

interface IProps {
  changeSort: boolean;
  categoryId: string;
  handleDragEnd: ({ active, over }: any) => void;
  sortedMenus?: TypeMenuList["menus"];
}

export default function RenderMenu({
  changeSort,
  categoryId,
  handleDragEnd,
  sortedMenus,
}: IProps) {
  const navigate = useRouter();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const [isNavigating, setIsNavigating] = useState(false);

  const { storeId } = useStoreContext();
  const { isSelected } = useMenuSelection();

  const { data } = menuQueries.useMenuList(storeId, categoryId);

  const handleNavigate = (menuId: string) =>
    `/${storeId}/menu/${menuId}/category/${categoryId}?hideModal=${isMobile}`;

  const handleCreateMenu = () => {
    setIsNavigating(true);
    navigate.push(
      `/${storeId}/menu/create?categoryId=${categoryId}&hideModal=${isMobile}`
    );
  };

  return (
    <div className="mt-4 mb-4 flex flex-1 flex-col lg:mt-6 lg:mb-0">
      {isNavigating && <Loading />}
      <div className="flex-1">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-x-[10px] md:gap-y-4 lg:grid-cols-5 lg:gap-x-[32px] lg:gap-y-[40px]">
          {sortedMenus && changeSort && (
            <Sortable
              items={sortedMenus.map((item) => item.menuId!)}
              onDragEnd={handleDragEnd}
              sortingStrategy={rectSortingStrategy}
            >
              {sortedMenus.map((item) => (
                <SortableItem
                  key={item.menuId!}
                  item={item}
                  onClick={() => navigate.push(handleNavigate(item.menuId!))}
                />
              ))}
            </Sortable>
          )}
          {!changeSort && (
            <button
              type="button"
              className="aspect-[329/440] h-full"
              onClick={handleCreateMenu}
            >
              <DashedBorder
                layoutClassName="bg-gray-700 cursor-pointer h-full"
                className="flex-col items-center justify-center gap-2"
                radius={{
                  lg: 24,
                  md: 15,
                  sm: 12,
                }}
              >
                <PlusIcon strokeWidth={1.5} />
                <span className="text-base lg:text-xl">메뉴 추가</span>
              </DashedBorder>
            </button>
          )}
          {!changeSort &&
            data?.menus?.map((item) => (
              <MenuCard
                key={item.menuId}
                isSelected={isSelected(item.menuId)}
                onClick={() => navigate.push(handleNavigate(item.menuId))}
                {...item}
              />
            ))}
        </div>
      </div>
    </div>
  );
}
