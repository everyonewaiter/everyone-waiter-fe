"use client";

import { Fragment, useState } from "react";
import Button from "@/components/common/Button/Button";
import { ScrollArea } from "@/components/common/ScrollArea";
import useOverlay from "@/hooks/use-overlay";
import QueryProviders from "@/app/query-providers";
import Floating from "../../_components/Floating";
import POSMenuCard from "../../_components/POSMenuCard";
import SideSection from "../../_components/SideSection";
import POSHeader from "../../_components/POSHeader";
import MenuModal from "../../_components/modals/MenuModal";

const dummyCategory = [
  {
    categoryId: "1",
    name: "전체",
  },
  { categoryId: "2", name: "스테이크" },
  { categoryId: "3", name: "파스타" },
  { categoryId: "4", name: "라멘" },
  { categoryId: "5", name: "볶음밥" },
];

const dummy: Menu[] = [
  {
    menuId: "694865267482835533",
    categoryId: "694865267482835533",
    name: "안심 스테이크",
    description: "1++ 한우 안심을 사용합니다.",
    price: 34900,
    spicy: 0,
    state: "DEFAULT",
    label: "BEST",
    image: "license/202505/0KJTZ2DXCDJJZ.webp",
  },
];

export default function DetailTableOrder() {
  const [isActive, setIsActive] = useState("1");

  const { open, close } = useOverlay();

  const handleMenuModal = () => {
    open(() => (
      <QueryProviders>
        <MenuModal onClose={close} />
      </QueryProviders>
    ));
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-1 flex-col">
        <POSHeader />
        <div className="relative px-[60px] pt-8">
          <div className="flex flex-row gap-3">
            {dummyCategory.map((category) => (
              <Button
                key={category.categoryId}
                variant={
                  isActive === category.categoryId ? "default" : "outline"
                }
                color={isActive === category.categoryId ? "primary" : "black"}
                className="button-sm text-s px-5"
                onClick={() => setIsActive(category.categoryId)}
              >
                {category.name}
              </Button>
            ))}
          </div>
          <ScrollArea className="h-[856px] w-full pt-9">
            <div className="grid grid-cols-4 gap-x-6 gap-y-8">
              {dummy?.map((menu) => (
                <Fragment key={menu.menuId}>
                  <POSMenuCard {...menu} onClick={handleMenuModal} />
                </Fragment>
              ))}
            </div>
          </ScrollArea>
          <Floating />
        </div>
      </div>
      <SideSection />
    </div>
  );
}
