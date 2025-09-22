"use client";

import { useFormContext } from "react-hook-form";
import { lazy, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { PlusIcon } from "@/components/common/Icon/index";
import DashedBorder from "@/components/DashedBorder";
import { useStoreContext } from "@/providers/storeProvider";
import { rectSortingStrategy } from "@/components/dnd";
import Loading from "@/components/Loading";
import Spinner from "@/components/common/Spinner";
import useBetterMediaQuery from "@/hooks/useBetterMediaQuery";
import { TypeMenuList } from "../_schema/menu.schema";
import { menuQueries } from "../_queries/useMenu";
import MenuCard from "./MenuCard";
import { useMenuSelection } from "../_stores/useMenuSelection";
import { useCategoriesWithMenus } from "../_queries/useCategoriesWithMenus";

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
  const isMobile = useBetterMediaQuery({ query: "(max-width: 767px)" });

  const form = useFormContext<TypeMenuList>();

  const [isNavigating, setIsNavigating] = useState(false);

  const { storeId } = useStoreContext();
  const { isSelected } = useMenuSelection();

  const { data: menus, isLoading: menusLoading } = menuQueries.useMenuList(
    storeId,
    categoryId,
    {
      enabled: categoryId !== "전체",
    }
  );
  const {
    data: categoriesWithMenus,
    isLoading: categoriesLoading,
    categories,
  } = useCategoriesWithMenus(storeId);

  useEffect(() => {
    const sourceData =
      categoryId === "전체" || categoryId === "" ? categoriesWithMenus : menus;
    if (sourceData?.menus && !categoriesLoading) {
      form.setValue(
        "menus",
        sourceData.menus.map((el) => ({
          ...el,
          price: String(el.price),
          label: el.label || undefined,
          category: el.categoryId,
        }))
      );
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [categoryId, categoriesLoading]);

  const data = categoryId === "전체" ? categoriesWithMenus : menus;
  const isLoading = categoryId === "전체" ? categoriesLoading : menusLoading;

  const handleNavigate = (category: string, menuId: string) =>
    `/${storeId}/menu/${menuId}/category/${category}?hideModal=${isMobile}`;

  const handleCreateMenu = () => {
    setIsNavigating(true);

    const isMobileNow =
      typeof window !== "undefined" && window.innerWidth <= 959;

    if (categoryId === "전체") {
      navigate.push(
        `/${storeId}/menu/create?categoryId=${categories.data?.categories?.[0]?.categoryId}&hideModal=${isMobileNow}`
      );
    } else {
      navigate.push(
        `/${storeId}/menu/create?categoryId=${categoryId}&hideModal=${isMobileNow}`
      );
    }
  };

  if (isLoading) return <Loading />;

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
                  onClick={() =>
                    navigate.push(handleNavigate(item.category, item.menuId!))
                  }
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
            (form.watch("menus") ?? data?.menus)?.map((item) => (
              <MenuCard
                key={item.menuId}
                isSelected={isSelected(item.menuId!, item.category)}
                onClick={() =>
                  navigate.push(handleNavigate(item.category, item.menuId!))
                }
                {...item}
                categoryId={item.category}
                menuId={item.menuId!}
                description={item.description!}
                spicy={item.spicy!}
                state={item.state!}
                label={item.label!}
                price={Number(item.price)}
              />
            ))}
          {categoriesLoading && <Spinner />}
        </div>
      </div>
    </div>
  );
}
