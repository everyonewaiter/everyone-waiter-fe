"use client";

import { Fragment, useState } from "react";
import { useParams } from "next/navigation";
import Button from "@/components/common/Button/Button";
import { ScrollArea } from "@/components/common/ScrollArea";
import cn from "@/lib/utils";
import useDeviceInfo from "@/app/(device-required)/device/_queries/useDeviceInfo";
import useOverlay from "@/hooks/use-overlay";
import Floating from "../../_components/Floating";
import POSMenuCard from "../../_components/POSMenuCard";
import SideSection from "../../_components/SideSection";
import POSHeader from "../../_components/POSHeader";
import usePos from "../../_queries/usePos";
import MenuModal from "../../_components/modals/MenuModal";

export default function DetailTableOrder() {
  const params = useParams();
  const tableNo = params?.tableId as string;

  const [isActive, setIsActive] = useState("전체");
  const [orders, setOrders] = useState<
    {
      menuId: string;
      menuName: string;
      quantity: number;
      totalPrice: number;
      menuOptionGroups: OrderOptionGroups[];
    }[]
  >([]);

  const { open, close } = useOverlay();

  const deviceInfo = useDeviceInfo();
  const { data: device } = deviceInfo;
  const { menuList, activity } = usePos();
  const categories = menuList(device?.storeId as string).data?.categories;
  const allMenus = categories?.map((el) => el.menus).flat();
  const selectedCategory = categories?.find(
    (el) => el.categoryId === isActive
  )?.menus;

  const { data } = activity(Number(tableNo));

  const list = isActive === "전체" ? allMenus : selectedCategory;

  const handleOpenDetail = (menuId: string) => {
    open(() => (
      <MenuModal
        data={allMenus?.find((el) => el.menuId === menuId)!}
        type="order"
        layoutClassName="!w-[1002px] !h-[650px]"
        close={close}
        onAddOrderMenu={(item) => setOrders((prev) => [...prev, item])}
      />
    ));
  };

  return (
    <div className="flex flex-row">
      <div className="flex flex-1 flex-col">
        <POSHeader />
        <div className="relative px-[60px] pt-8">
          <div className="flex flex-row gap-3">
            <Button
              variant={isActive === "전체" ? "default" : "outline"}
              color={isActive === "전체" ? "primary" : "black"}
              className={cn(
                "button-sm text-s px-5",
                isActive === "전체" ? "text-white" : "text-gray-0"
              )}
              onClick={() => setIsActive("전체")}
            >
              전체
            </Button>
            {categories?.map((category) => (
              <Button
                key={category.categoryId}
                variant={
                  isActive === category.categoryId ? "default" : "outline"
                }
                color={isActive === category.categoryId ? "primary" : "black"}
                className={cn(
                  "button-sm text-s px-5",
                  isActive === category.categoryId
                    ? "text-white"
                    : "text-gray-0"
                )}
                onClick={() => setIsActive(category.categoryId)}
              >
                {category.name}
              </Button>
            ))}
          </div>
          <ScrollArea className="h-[856px] w-full pt-9">
            <div className="grid grid-cols-4 gap-x-6 gap-y-8">
              {list?.map((menu) => (
                <Fragment key={menu.menuId}>
                  <POSMenuCard
                    onClick={() => handleOpenDetail(menu.menuId)}
                    {...menu}
                  />
                </Fragment>
              ))}
            </div>
          </ScrollArea>
          <Floating hasData={data?.active!} tableNo={Number(tableNo)} />
        </div>
      </div>
      <SideSection orders={orders} resetOrder={() => setOrders([])} />
    </div>
  );
}
