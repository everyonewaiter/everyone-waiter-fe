"use client";

import { getMenusWithCategory } from "@/lib/api/stores.api";
import { useQuery } from "@tanstack/react-query";
import { ArrowLeftRightIcon, Trash2Icon } from "lucide-react";
import { Fragment, useState } from "react";
import MenuCard from "./MenuCard";
import AddMenu from "./AddMenu";

interface AllMenuProps {
  storeId: string;
}

interface SelectedMenu {
  menuId: string;
  categoryId: string;
}

export default function AllMenu({ storeId }: AllMenuProps) {
  const [selectedMenus, setSelectedMenus] = useState<SelectedMenu[]>([]);

  const handleMenuSelect = (
    menuId: string,
    categoryId: string,
    isChecked: boolean
  ) => {
    if (isChecked) {
      setSelectedMenus((prev) => [...prev, { menuId, categoryId }]);
    } else {
      setSelectedMenus((prev) => prev.filter((item) => item.menuId !== menuId));
    }
  };

  const handleDelete = () => {
    console.log("선택된 메뉴들:", selectedMenus);
    // TODO - 삭제 로직 구현
  };
  const isMenuSelected = (menuId: string) =>
    selectedMenus.some((menu) => menu.menuId === menuId);

  const { data } = useQuery({
    queryKey: ["menus-with-category", storeId],
    queryFn: () => getMenusWithCategory(storeId),
  });
  // 메뉴만 뽑아내기
  const allMenus = data?.categories.flatMap((category) => category.menus);

  return (
    <>
      <div className="my-4 flex items-center gap-4 self-end md:my-0 md:-translate-y-7">
        <button
          type="button"
          onClick={() => console.log("순서변경")}
          className="flex items-center gap-1"
        >
          <ArrowLeftRightIcon
            strokeWidth={1}
            className="size-[20px] -rotate-90 text-gray-300"
          />
          <p className="text-[14px] text-gray-300">순서변경</p>
        </button>
        <button
          type="button"
          onClick={handleDelete}
          className="flex items-center gap-1"
        >
          <Trash2Icon
            strokeWidth={1}
            className="text-status-error size-[20px]"
          />
          <p className="text-status-error text-[14px]">삭제</p>
        </button>
      </div>
      <div className="flex flex-wrap gap-4">
        <AddMenu />
        {allMenus?.map((menu) => (
          <Fragment key={menu.menuId}>
            <MenuCard
              menu={menu}
              isSelected={isMenuSelected(menu.menuId)}
              onSelect={handleMenuSelect}
            />
          </Fragment>
        ))}
      </div>
    </>
  );
}
