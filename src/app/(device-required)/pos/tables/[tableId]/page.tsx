"use client";

import { useParams } from "next/navigation";
import { Fragment, useEffect, useState } from "react";
import useDeviceInfo from "@/app/(device-required)/device/_queries/useDeviceInfo";
import { ScrollArea } from "@/components/common/ScrollArea";
import useOverlay from "@/hooks/use-overlay";
import dynamic from "next/dynamic";
import CategoriesButton from "../../_components/CategoriesButton";
import POSHeader from "../../_components/POSHeader";
import POSMenuCard from "../../_components/POSMenuCard";
import useCheckedMenuStore from "../../_hooks/useCheckedMenu";
import { useMemoStore } from "../../_hooks/useMemoStore";
import { useOrderStore } from "../../_hooks/useOrderStore";
import usePos from "../../_queries/usePos";

const MenuModal = dynamic(() => import("../../_components/modals/MenuModal"), {
  ssr: false,
});

const Floating = dynamic(() => import("../../_components/Floating"), {
  ssr: false,
});

const SideSection = dynamic(
  () => import("../../_components/SideSection/SideSection"),
  {
    ssr: false,
  }
);

export default function DetailTableOrder() {
  const params = useParams();
  const tableNo = params?.tableId as string;

  const [isActive, setIsActive] = useState("전체");
  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  const { orders, addOrders } = useOrderStore();
  const { open, close } = useOverlay();
  const { setOriginMemo } = useMemoStore();
  const { resetCheckedMenu } = useCheckedMenuStore();

  const { detail } = useDeviceInfo();
  const { data: device } = detail();

  const { menuList, activity } = usePos();

  const { data: menus, isLoading } = menuList(device?.storeId as string);
  const allMenus = menus?.categories?.map((el) => el.menus).flat();
  const selectedCategory = menus?.categories?.find(
    (el) => el.categoryId === isActive
  )?.menus;

  const { data } = activity(Number(tableNo));

  useEffect(() => {
    if (!isLoading && (data || menus)) {
      setHasLoadedOnce(true);
    }
  }, [data, menus, isLoading]);

  useEffect(() => {
    if (data) {
      const origin = data.orders
        .filter((el) => el.memo)
        .map((el) => el.memo)
        .join(", ");
      setOriginMemo(origin);
    }
  }, [data, setOriginMemo]);

  const list = isActive === "전체" ? allMenus : selectedCategory;

  const isSameOrder = (a: CustomOrder, b: CustomOrder): boolean => {
    if (a.menuId !== b.menuId) return false;
    if (a.menuOptionGroups.length !== b.menuOptionGroups.length) return false;

    return a.menuOptionGroups.every((groupA) => {
      const groupB = b.menuOptionGroups.find(
        (g) => g.orderOptionGroupId === groupA.orderOptionGroupId
      );
      if (!groupB) return false;
      if (groupA.orderOptions.length !== groupB.orderOptions.length)
        return false;

      return groupA.orderOptions.every((optA) =>
        groupB.orderOptions.some(
          (optB) => optA.name === optB.name && optA.price === optB.price
        )
      );
    });
  };

  const handleOpenDetail = (menuId: string) => {
    open(() => (
      <MenuModal
        data={allMenus?.find((el) => el.menuId === menuId)!}
        type="order"
        layoutClassName="!w-[1002px] !h-[650px]"
        close={close}
        onAddOrderMenu={(item) => {
          const exists = orders.find((order) => isSameOrder(order, item));

          if (exists) {
            // eslint-disable-next-line no-alert
            alert("이미 같은 메뉴와 옵션이 있습니다.");
            return;
          }

          addOrders(item);
        }}
      />
    ));
  };

  return (
    <div className="flex min-h-screen flex-row">
      <div
        className="relative flex flex-1 cursor-pointer flex-col"
        onClick={resetCheckedMenu}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            resetCheckedMenu();
          }
        }}
      >
        <POSHeader />
        <div className="relative h-full px-[60px] pt-8">
          <CategoriesButton
            categories={menus?.categories!}
            isActive={isActive}
            onSetIsActive={setIsActive}
          />
          {!hasLoadedOnce && list?.length === 0 && (
            <div className="text-gray-0 center h-full pb-8 text-center text-xl">
              메뉴 목록을 가져오는 중입니다.
            </div>
          )}
          {hasLoadedOnce && list?.length! === 0 && !menus?.categories && (
            <div className="text-gray-0 center flex flex-1 flex-col bg-green-50 pt-8 text-center text-xl">
              등록된 메뉴가 없습니다.
            </div>
          )}
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
            {hasLoadedOnce && list?.length! === 0 && menus?.categories && (
              <div className="text-gray-0 center h-[740px] pt-8 text-center text-xl">
                등록된 메뉴가 없습니다.
              </div>
            )}
            {!hasLoadedOnce && menus?.categories && (
              <div className="text-gray-0 center h-full pt-8 text-center text-xl">
                메뉴 목록을 가져오는 중입니다.
              </div>
            )}
          </div>
        </div>
        <Floating hasData={data?.active!} tableNo={Number(tableNo)} />
      </div>
      <SideSection />
    </div>
  );
}
