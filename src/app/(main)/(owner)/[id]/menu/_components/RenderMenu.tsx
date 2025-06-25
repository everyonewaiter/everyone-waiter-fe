"use client";

import { ScrollArea } from "@/components/common/ScrollArea";
import DashedBorder from "@/components/DashedBorder";
import { PlusIcon } from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { useRouter } from "next/navigation";
import { useStoreContext } from "@/providers/storeProvider";
import dynamic from "next/dynamic";
import MenuCard from "./MenuCard";
import useMenu from "../_queries/useMenu";

const Sortable = dynamic(() => import("@/components/Sortable"), {
  ssr: false,
  loading: () => <div>순서 변경 로딩 중...</div>,
});

const SortableItem = dynamic(() => import("./SortableItem"), {
  ssr: false,
  loading: () => <div>로딩 중...</div>,
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
  const { query: menuQuery } = useMenu(storeId);
  const menu = menuQuery(categoryId).data?.menus;

  const handleNavigate = (menuId: string) =>
    `/${storeId}/menu/${menuId}?hideModal=${isMobile}&categoryId=${categoryId}`;

  return (
    <div className="mt-4 mb-4 flex flex-1 flex-col lg:mt-6 lg:mb-0">
      <ScrollArea className="h-[550px] md:h-[385px] lg:h-[785px]">
        <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-x-[10px] md:gap-y-[16px] lg:h-[440px] lg:gap-x-[32px] lg:gap-y-[40px]">
          <button
            type="button"
            className="h-full"
            onClick={() =>
              navigate.push(`/${storeId}/menu/create?hideModal=${isMobile}`)
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
              items={menu?.map((item) => item.menuId)!}
              onDragEnd={handleDragEnd}
            >
              {menu?.map((item) => (
                <SortableItem
                  key={item.menuId}
                  item={item}
                  onClick={() => navigate.push(handleNavigate(item.menuId))}
                />
              ))}
            </Sortable>
          ) : (
            menu?.map((item) => (
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
      </ScrollArea>
    </div>
  );
}
