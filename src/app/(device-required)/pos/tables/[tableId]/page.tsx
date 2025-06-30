"use client";

import { Fragment, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Button from "@/components/common/Button/Button";
import { ScrollArea } from "@/components/common/ScrollArea";
import cn from "@/lib/utils";
import useDeviceInfo from "@/app/(device-required)/device/_queries/useDeviceInfo";
import useOverlay from "@/hooks/use-overlay";
import Floating from "../../_components/Floating";
import POSMenuCard from "../../_components/POSMenuCard";
import POSHeader from "../../_components/POSHeader";
import usePos from "../../_queries/usePos";
import MenuModal from "../../_components/modals/MenuModal";
import { useMemoStore } from "../../_hooks/useMemoStore";
import SideSection from "../../_components/SideSection/SideSection";

export default function DetailTableOrder() {
  const params = useParams();
  const tableNo = params?.tableId as string;

  const [isActive, setIsActive] = useState("전체");
  const [orders, setOrders] = useState<CustomOrder[]>([]);

  const { open, close } = useOverlay();

  const deviceInfo = useDeviceInfo();
  const { data: device } = deviceInfo;
  const { menuList, activity } = usePos();
  const { data: menus, isLoading } = menuList(device?.storeId as string);
  const allMenus = menus?.categories?.map((el) => el.menus).flat();
  const selectedCategory = menus?.categories?.find(
    (el) => el.categoryId === isActive
  )?.menus;

  const { data } = activity(Number(tableNo));

  const { setOriginMemo } = useMemoStore();

  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    if (!isLoading && data) {
      setHasLoadedOnce(true);
    }
  }, [data, isLoading]);

  useEffect(() => {
    if (data) {
      const origin = data.orders
        .filter((el) => el.memo)
        .map((el) => el.memo)
        .join(", ");
      setOriginMemo(origin);
    }
  }, [data]);

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
    <div className="flex min-h-screen flex-row">
      <div className="relative flex flex-1 flex-col">
        <POSHeader />
        {!hasLoadedOnce && (
          <div className="text-gray-0 center h-full text-center text-xl">
            테이블 목록을 가져오는 중입니다.
          </div>
        )}
        {hasLoadedOnce && list?.length! === 0 && (
          <div className="text-gray-0 center h-full text-center text-xl">
            등록된 테이블이 없습니다.
          </div>
        )}
        <div className="relative h-full px-[60px] pt-8">
          <div className="flex flex-row gap-3">
            {menus?.categories && (
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
            )}
            {menus?.categories?.map((category) => (
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
          <div>
            {hasLoadedOnce && list?.length! > 0 && (
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
            )}
          </div>
        </div>
        <Floating
          hasData={data?.active!}
          tableNo={Number(tableNo)}
          hasOrder={!!orders.length}
        />
      </div>
      <SideSection orders={orders} resetOrder={() => setOrders([])} />
    </div>
  );
}
