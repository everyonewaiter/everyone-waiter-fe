"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { Fragment, useState } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/common/Button/Button";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import useOverlay from "@/hooks/use-overlay";
import cn from "@/lib/utils";
import usePublic from "../../../_queries/usePublic";

const MenuCard = dynamic(
  () => import("@/app/(main)/(owner)/[id]/menu/_components/MenuCard"),
  { ssr: false }
);

const MobileMenuCard = dynamic(() => import("../MobileMenuCard"), {
  ssr: false,
});

const OriginModal = dynamic(() => import("../OriginModal"), {
  ssr: false,
});

export default function MenuPreview() {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const storeId = searchParams.get("storeId") as string;
  const accessKey = searchParams.get("accessKey") as string;

  const [activeTab, setActiveTab] = useState("전체");

  const { open, close } = useOverlay();

  const handleOpenModal = () => {
    open(() => <OriginModal close={close} />);
  };

  const { menus } = usePublic(storeId, accessKey);
  const { data } = menus;
  const menuList =
    activeTab === "전체"
      ? data?.categories.map((el) => el.menus).flat()
      : data?.categories
          .filter((v) => v.name === activeTab)
          .map((el) => el.menus)
          .flat();

  return (
    <div className="min-h-full w-full bg-white px-5 pb-5 md:rounded-[20px] md:px-6 md:pb-6 lg:rounded-[32px] lg:px-8 lg:pb-8">
      <div className="flex items-end justify-between pb-6 md:items-start md:justify-start md:gap-2 md:pb-7 lg:pb-12">
        {/* TODO: 이 부분은 직접 작성하는 부분인가? 어디서? 어떻게? */}
        <button
          type="button"
          className="bg-primary font-hakgyo center rounded-br-[12px] rounded-bl-[12px] px-4 pt-5 pb-4 text-base text-white lg:rounded-br-[20px] lg:rounded-bl-[20px] lg:px-6 lg:pt-7 lg:pb-6 lg:text-2xl"
        >
          매장 내 태블릿에서 주문!
        </button>
        <button
          type="button"
          className="font-hakgyo hidden rounded-br-[20px] rounded-bl-[20px] bg-gray-400 text-white md:flex md:items-center md:justify-center md:px-4 md:pt-5 md:pb-4 md:text-base lg:px-6 lg:pt-7 lg:pb-6 lg:text-2xl"
        >
          주문은 매장 내 태블릿에서만 가능합니다
        </button>
        <Button
          variant="outline"
          color="grey"
          className="mb-1 h-8 rounded-[40px] border-gray-500 px-3 text-xs text-gray-200 hover:text-gray-300 md:hidden"
          onClick={handleOpenModal}
        >
          원산지 정보
        </Button>
      </div>
      <div className="flex items-center justify-between pb-4 md:pb-3 lg:pb-4">
        <div className="scrollbar-hide flex gap-2 overflow-x-auto lg:gap-3">
          <ResponsiveButton
            variant={activeTab === "전체" ? "default" : "outline"}
            color={activeTab === "전체" ? "black" : "grey"}
            responsiveButtons={{
              lg: { buttonSize: "xl", className: "!text-lg !font-medium" },
              md: { buttonSize: "sm", className: "!text-s" },
              sm: { buttonSize: "sm" },
            }}
            onClick={() => setActiveTab("전체")}
            commonClassName={cn(
              activeTab === "전체" ? "" : "border-gray-500 hover:text-gray-300"
            )}
          >
            전체
          </ResponsiveButton>
          {data?.categories.map((key) => (
            <ResponsiveButton
              key={key.categoryId}
              variant={activeTab === key.name ? "default" : "outline"}
              color={activeTab === key.name ? "black" : "grey"}
              responsiveButtons={{
                lg: { buttonSize: "xl", className: "!text-lg !font-medium" },
                md: { buttonSize: "sm", className: "!text-s" },
                sm: { buttonSize: "sm" },
              }}
              onClick={() => setActiveTab(key.name)}
              commonClassName={cn(
                activeTab === key.name
                  ? ""
                  : "border-gray-500 hover:text-gray-300"
              )}
            >
              {key.name}
            </ResponsiveButton>
          ))}
        </div>
        <ResponsiveButton
          variant="outline"
          color="grey"
          responsiveButtons={{
            lg: {
              buttonSize: "xl",
              className: "!text-lg !font-medium !rounded-[100px]",
            },
            md: { buttonSize: "sm", className: "!text-s !rounded-[40px]" },
          }}
          commonClassName="border-gray-500 hover:text-gray-300"
          onClick={handleOpenModal}
        >
          원산지 정보
        </ResponsiveButton>
      </div>
      <div className="-mx-5 h-[1px] w-screen bg-gray-600 md:hidden" />
      <div className="hidden md:grid md:grid-cols-4 md:gap-x-4 md:gap-y-4 lg:grid-cols-5 lg:gap-x-5 lg:gap-y-10">
        {menuList?.map((item) => (
          <MenuCard
            key={item.menuId}
            onClick={() =>
              navigate.push(
                `/menus/preview/${item.menuId}?storeId=${storeId}&categoryId=${item.categoryId}`
              )
            }
            {...item}
            className="!w-full md:!min-h-[290px] lg:!min-h-[417px]"
          />
        ))}
      </div>
      <div className="flex flex-col md:hidden">
        {menuList?.map((item) => (
          <Fragment key={item.menuId}>
            <MobileMenuCard
              onClick={() =>
                navigate.push(
                  `/menus/preview/${item.menuId}?storeId=${storeId}&categoryId=${item.categoryId}`
                )
              }
              {...item}
            />
            <div className="h-[1px] w-full bg-gray-600" />
          </Fragment>
        ))}
      </div>
    </div>
  );
}
