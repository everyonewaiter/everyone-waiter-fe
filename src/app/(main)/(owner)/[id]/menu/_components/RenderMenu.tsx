"use client";

import { PlusIcon } from "@/components/common/Icon/index";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import DashedBorder from "@/components/DashedBorder";
import { useStoreContext } from "@/providers/storeProvider";
import Spinner from "@/components/common/Spinner";
import { rectSortingStrategy } from "@/components/dnd";
import { Skeleton } from "@/components/common/Skeleton/Skeleton";
import { TypeMenuList } from "../_schema/menu.schema";
import { menuQueries } from "../_queries/useMenu";
import MenuCard from "./MenuCard";
import { useMenuSelection } from "../_stores/useMenuSelection";

const Sortable = dynamic(() => import("@/components/Sortable"), {
  ssr: false,
  loading: () => <Spinner />,
});

const SortableItem = dynamic(() => import("./SortableItem"), {
  ssr: false,
  loading: () => <Spinner />,
});

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

  const { storeId } = useStoreContext();
  const { isSelected } = useMenuSelection();

  const { data, isLoading } = menuQueries.useMenuList(storeId, categoryId);

  const handleNavigate = (menuId: string) =>
    `/${storeId}/menu/${menuId}/category/${categoryId}?hideModal=${isMobile}`;

  return (
    <div className="mt-4 mb-4 flex flex-1 flex-col lg:mt-6 lg:mb-0">
      <div className="flex-1">
        <div className="grid grid-cols-3 gap-4 md:grid-cols-5 md:gap-x-[10px] md:gap-y-4 lg:gap-x-[32px] lg:gap-y-[40px]">
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
              onClick={() =>
                navigate.push(
                  `/${storeId}/menu/create?categoryId=${categoryId}&hideModal=${isMobile}`
                )
              }
            >
              <DashedBorder
                layoutClassName="bg-gray-700 cursor-pointer h-full"
                radius={{
                  lg: 24,
                  md: 12,
                  sm: 15,
                }}
              >
                <PlusIcon strokeWidth={1.5} />
                <span className="text-base">메뉴 추가</span>
              </DashedBorder>
            </button>
          )}
          {data &&
            !changeSort &&
            data?.menus?.map((item) => (
              <MenuCard
                key={item.menuId}
                isSelected={isSelected(item.menuId)}
                onClick={() => navigate.push(handleNavigate(item.menuId))}
                {...item}
              />
            ))}
          {isLoading &&
            [0, 1, 2, 3].map((el) => (
              <Skeleton
                key={el + 1}
                className="aspect-[329/440] rounded-xl lg:rounded-3xl"
              />
            ))}
        </div>
      </div>
    </div>
  );
}
