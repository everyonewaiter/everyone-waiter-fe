"use client";

import { useRouter } from "next/navigation";
// import { useSearchParams } from 'next/navigation';
import { Fragment, useState } from "react";
import dynamic from "next/dynamic";
import Button from "@/components/common/Button/Button";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import useOverlay from "@/hooks/use-overlay";
import cn from "@/lib/utils";

const MenuCard = dynamic(
  () => import("@/app/(main)/(owner)/[id]/menu/_components/MenuCard"),
  { ssr: false }
);

const MobileMenuCard = dynamic(() => import("../_components/MobileMenuCard"), {
  ssr: false,
});

const OriginModal = dynamic(() => import("../_components/OriginModal"), {
  ssr: false,
});

const categories = ["전체", "스테이크", "파스타", "라멘", "볶음밥"];

const menu: Menu[] = [
  {
    menuId: "694865267482835533",
    categoryId: "694865267482835533",
    name: "안심 스테이크",
    description: "1++ 한우 안심을 사용합니다.",
    price: 34900,
    spicy: 0,
    state: "DEFAULT",
    label: "BEST",
    image: "license/202504/0KA652ZFZ26DG.webp",
  },
  {
    menuId: "694865267482835534",
    categoryId: "694865267482835533",
    name: "안심 스테이크",
    description: "1++ 한우 안심을 사용합니다.",
    price: 34900,
    spicy: 0,
    state: "DEFAULT",
    label: "BEST",
    image: "license/202504/0KA652ZFZ26DG.webp",
  },
  {
    menuId: "694865267482835535",
    categoryId: "694865267482835533",
    name: "안심 스테이크",
    description: "1++ 한우 안심을 사용합니다.",
    price: 34900,
    spicy: 0,
    state: "DEFAULT",
    label: "BEST",
    image: "license/202504/0KA652ZFZ26DG.webp",
  },
  {
    menuId: "694865267482835536",
    categoryId: "694865267482835533",
    name: "안심 스테이크",
    description: "1++ 한우 안심을 사용합니다.",
    price: 34900,
    spicy: 0,
    state: "DEFAULT",
    label: "BEST",
    image: "license/202504/0KA652ZFZ26DG.webp",
  },
  {
    menuId: "694865267482835537",
    categoryId: "694865267482835533",
    name: "안심 스테이크",
    description: "1++ 한우 안심을 사용합니다.",
    price: 34900,
    spicy: 0,
    state: "DEFAULT",
    label: "BEST",
    image: "license/202504/0KA652ZFZ26DG.webp",
  },
];

export default function Page() {
  // const searchParams = useSearchParams();
  // const storeId = searchParams.get('storeId')
  const navigate = useRouter();
  const { open, close } = useOverlay();

  const handleOpenModal = () => {
    open(() => <OriginModal close={close} />);
  };

  const [activeTab, setActiveTab] = useState("전체");

  return (
    <div className="min-h-full w-full bg-white px-5 pb-5 md:rounded-[20px] md:px-6 md:pb-6 lg:rounded-[32px] lg:px-8 lg:pb-8">
      <div className="flex items-end justify-between pb-6 md:items-start md:justify-start md:gap-2 md:pb-7 lg:pb-12">
        <button
          type="button"
          className="bg-primary font-hakgyo center rounded-br-[12px] rounded-bl-[12px] px-4 pt-5 pb-4 text-base text-white lg:rounded-br-[20px] lg:rounded-bl-[20px] lg:px-6 lg:pt-7 lg:pb-6 lg:text-2xl"
        >
          옥휴바 & 칵테일 라운지
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
          {categories.map((key) => (
            <ResponsiveButton
              key={key}
              variant={activeTab === key ? "default" : "outline"}
              color={activeTab === key ? "black" : "grey"}
              responsiveButtons={{
                lg: { buttonSize: "xl", className: "!text-lg !font-medium" },
                md: { buttonSize: "sm", className: "!text-s" },
                sm: { buttonSize: "sm" },
              }}
              onClick={() => setActiveTab(key)}
              commonClassName={cn(
                activeTab === key ? "" : "border-gray-500 hover:text-gray-300"
              )}
            >
              {key}
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
        {menu?.map((item) => (
          <MenuCard
            key={item.menuId}
            onClick={() => navigate.push(`/menus/preview/${item.menuId}`)}
            {...item}
            className="!w-full md:!min-h-[290px] lg:!min-h-[417px]"
          />
        ))}
      </div>
      <div className="flex flex-col md:hidden">
        {menu?.map((item, index) => (
          <Fragment key={item.menuId}>
            <MobileMenuCard
              onClick={() => navigate.push(`/menus/preview/${item.menuId}`)}
              {...item}
            />
            {index < menu.length - 1 && (
              <div className="h-[1px] w-full bg-gray-600" />
            )}
          </Fragment>
        ))}
      </div>
    </div>
  );
}
