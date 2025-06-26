"use client";

import MenuCard from "@/app/(main)/(owner)/[id]/menu/_components/MenuCard";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import cn from "@/lib/utils";
// import { useSearchParams } from 'next/navigation';
import { useState } from "react";

const categories = ["전체", "스테이크", "파스타", "라멘", "볶음밥"];

const menu: Menu[] = [];

export default function Page() {
  // const searchParams = useSearchParams();
  // const storeId = searchParams.get('storeId')

  const [activeTab, setActiveTab] = useState("전체");

  return (
    <div className="min-h-full w-full rounded-[32px] bg-white px-8 pb-8">
      <div className="flex gap-2 pb-12">
        <button
          type="button"
          className="bg-primary font-hakgyo center h-[77px] rounded-br-[20px] rounded-bl-[20px] px-6 text-2xl text-white"
        >
          옥휴바 & 칵테일 라운지
        </button>
        <button
          type="button"
          className="font-hakgyo center h-[77px] rounded-br-[20px] rounded-bl-[20px] bg-gray-400 px-6 text-2xl text-white"
        >
          주문은 매장 내 태블릿에서만 가능합니다
        </button>
      </div>
      <div className="flex items-center justify-between pb-4">
        <div className="flex gap-[12px]">
          {categories.map((key) => (
            <ResponsiveButton
              key={key}
              variant={activeTab === key ? "default" : "outline"}
              color={activeTab === key ? "black" : "grey"}
              responsiveButtons={{
                lg: { buttonSize: "xl", className: "!text-lg !font-medium" },
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
          }}
          commonClassName="border-gray-500 hover:text-gray-300"
        >
          원산지 정보
        </ResponsiveButton>
      </div>
      <div className="grid grid-cols-5 gap-x-5 gap-y-10 overflow-y-auto">
        {menu?.map((item) => (
          <MenuCard key={item.menuId} onClick={() => {}} {...item} />
        ))}
      </div>
    </div>
  );
}
