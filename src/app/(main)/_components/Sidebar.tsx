"use client";

import useAuthStore from "@/stores/useAuthStore";
import Image from "next/image";
import { useStore } from "zustand";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { getStoreList } from "@/lib/api/stores.api";
import { useQuery } from "@tanstack/react-query";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/select";
import MENU_ITEMS from "@/constants/sidebarMenus";
import { getComparePath } from "@/utils/getPathname";
import Icon from "@/components/common/Icon";

export default function Sidebar() {
  const { user } = useStore(useAuthStore, (state) => state);
  const permission = user?.permission || "USER";
  const pathname = usePathname();
  const [selectedStoreId, setSelectedStoreId] = useState<string>("");
  const comparePath = getComparePath(pathname, permission);

  // OWNER인 경우에만 매장 목록 조회
  const { data: storeList } = useQuery({
    queryKey: ["store-list"],
    queryFn: getStoreList,
    enabled: permission === "OWNER",
  });

  // storeList가 있을 때 첫 번째 매장 ID를 기본값으로 설정
  useEffect(() => {
    if (storeList?.stores.length) {
      setSelectedStoreId(storeList.stores[0].storeId);
    }
  }, [storeList]);

  const isOwnerWithoutStore =
    permission === "OWNER" && storeList?.stores.length === 0;

  return (
    <div
      className={`hidden py-8 pl-[60px] ${isOwnerWithoutStore ? "md:hidden" : "md:block"}`}
    >
      <aside className="flex h-full flex-col rounded-[28px] bg-white px-3 pt-4 md:w-[186px] lg:w-[318px] lg:px-5 lg:pt-8">
        <div className="mb-6 flex items-center gap-[18px] lg:mb-9">
          <Image
            src="/icons/logo/logo.svg"
            alt="모두의 웨이터 로고"
            width={40}
            height={40}
          />
          <h1 className="font-hakgyo text-primary text-[16px] lg:text-2xl">
            모두의 웨이터
          </h1>
        </div>
        <nav>
          {permission === "OWNER" ? (
            <Select value={selectedStoreId} onValueChange={setSelectedStoreId}>
              <SelectTrigger className="bg-primary flex w-full items-center justify-between rounded-xl text-[15px] font-bold text-white md:py-[12.5px] md:pl-4 lg:py-[14.5px] lg:pl-5 lg:text-[18px]">
                <SelectValue placeholder="매장 선택">
                  {storeList?.stores.find(
                    (store) => store.storeId === selectedStoreId
                  )?.name || "매장 선택"}
                </SelectValue>
              </SelectTrigger>
              <SelectContent>
                {storeList?.stores.map((store) => (
                  <SelectItem key={store.storeId} value={store.storeId}>
                    {store.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          ) : (
            <div className="bg-primary flex w-full items-center justify-between rounded-xl py-[12.5px] pl-4 lg:py-[14.5px] lg:pl-5">
              <h1 className="text-[15px] font-bold text-white lg:text-[18px]">
                관리자
              </h1>
            </div>
          )}
          <ul className="relative mt-2">
            {MENU_ITEMS[permission].length > 1 && (
              <div className="absolute top-[18px] bottom-[18px] left-[11px] w-[2px] bg-gray-600" />
            )}
            {MENU_ITEMS[permission].map((item) => {
              const isActive = comparePath === item.href;
              return (
                <li key={item.href}>
                  <Link
                    href={
                      permission === "OWNER"
                        ? `/${selectedStoreId}${item.href}`
                        : item.href
                    }
                    className={`flex items-center gap-3 px-2 py-[9px] text-[13px] transition-colors lg:text-[16px] ${
                      isActive ? "text-primary" : "text-gray-300"
                    }`}
                  >
                    {/* 빨간 점 (활성 메뉴만) */}
                    <div
                      className={`z-1 size-2 rounded-full ${
                        isActive ? "bg-primary" : "bg-gray-600"
                      }`}
                    />
                    <Icon
                      iconKey={item.icon as string}
                      className={`size-6 ${isActive ? "text-primary" : "text-gray-300"}`}
                    />
                    <span className="font-medium">{item.label}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </aside>
    </div>
  );
}
