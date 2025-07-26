"use client";

import { PlusIcon } from "lucide-react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useMediaQuery } from "react-responsive";
import DashedBorder from "@/components/DashedBorder";
import { useStoreContext } from "@/providers/storeProvider";
import Spinner from "@/components/common/Spinner";
import { menuQueries } from "../_queries/useMenu";
import MenuCard from "./MenuCard";

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
  isSelected: (value: { menuId: string }) => boolean;
  toggle: (value: { menuId: string }) => void;
  handleDragEnd: ({ active, over }: any) => void;
}

export default function RenderMenu({
  changeSort,
  categoryId,
  isSelected,
  toggle,
  handleDragEnd,
}: IProps) {
  const navigate = useRouter();
  const isMobile = useMediaQuery({ query: "(max-width: 767px)" });

  const { storeId } = useStoreContext();
  const { data } = menuQueries.useMenuList(storeId, categoryId);

  const handleNavigate = (menuId: string) =>
    `/${storeId}/menu/${menuId}/category/${categoryId}?hideModal=${isMobile}`;

  return (
    <div className="mt-4 mb-4 flex flex-1 flex-col lg:mt-6 lg:mb-0">
      <div className="flex-1">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-x-[10px] md:gap-y-[16px] lg:gap-x-[32px] lg:gap-y-[40px]">
          <button
            type="button"
            className="h-full"
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
          {changeSort ? (
            <Sortable
              items={data?.menus?.map((item) => item.menuId)!}
              onDragEnd={handleDragEnd}
            >
              {data?.menus?.map((item) => (
                <SortableItem
                  key={item.menuId}
                  item={item}
                  onClick={() => navigate.push(handleNavigate(item.menuId))}
                />
              ))}
            </Sortable>
          ) : (
            data?.menus?.map((item) => (
              <MenuCard
                key={item.menuId}
                onToggle={toggle}
                isSelected={isSelected(item)}
                onClick={() => navigate.push(handleNavigate(item.menuId))}
                {...item}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
