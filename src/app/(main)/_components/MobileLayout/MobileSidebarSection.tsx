"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useStore } from "zustand";
import dynamic from "next/dynamic";
import { getStoreList } from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import MENU_ITEMS from "@/constants/sidebarMenus";
import useAuthStore from "@/stores/useAuthStore";
import { getComparePath } from "@/utils/getPathname";
import Icon from "@/components/common/Icon/Icon";
import cn from "@/lib/utils";

const MainSelect = dynamic(() => import("../MainSelect"), {
  ssr: false,
});

interface IProps {
  onClose: () => void;
}

export default function MobileSidebarSection({ onClose }: IProps) {
  const navigate = useRouter();

  const { user } = useStore(useAuthStore, (state) => state);
  const permission = user?.permission || "USER";
  const pathname = usePathname();
  const comparePath = getComparePath(pathname, permission);

  const [selectedStore, setSelectedStore] = useState<{
    name: string;
    storeId: string;
  }>({
    name: "",
    storeId: "",
  });
  // OWNER인 경우에만 매장 목록 조회
  const { data: storeList } = useQuery({
    queryKey: ["store-list"],
    queryFn: getStoreList,
    enabled: permission === "OWNER",
  });

  // storeList가 있을 때 첫 번째 매장 ID를 기본값으로 설정
  useEffect(() => {
    if (storeList?.stores?.length) {
      setSelectedStore(storeList.stores[0]);
    }
  }, [storeList]);

  const isOwnerWithoutStore =
    permission === "OWNER" && storeList?.stores?.length === 0;

  const handleClick = (href: string) => {
    if (permission === "OWNER") {
      navigate.push(`/${selectedStore.storeId}${href}`);
    } else {
      navigate.push(href);
    }
    onClose();
  };

  const commonStyle =
    "bg-primary flex w-full items-center justify-between rounded-xl";

  return (
    <div className={`${isOwnerWithoutStore ? "md:hidden" : "md:block"}`}>
      <nav>
        {permission === "OWNER" ? (
          <MainSelect
            value={selectedStore.name}
            onValueChange={(value) =>
              setSelectedStore(
                storeList?.stores?.find((el) => el.name === value)!
              )
            }
            triggerClassname="text-sm font-bold text-white"
            stores={storeList?.stores}
          />
        ) : (
          <div
            className={cn(
              commonStyle,
              "py-[12.5px] pl-4 lg:py-[14.5px] lg:pl-5"
            )}
          >
            <h1 className="text-[15px] font-bold text-white lg:text-[18px]">
              관리자
            </h1>
          </div>
        )}
        <ul className="relative">
          {MENU_ITEMS[permission]?.length > 1 && (
            <div className="absolute top-[18px] bottom-[18px] left-[11px] w-[2px] bg-gray-600" />
          )}
          {MENU_ITEMS[permission].map((item) => {
            const isActive =
              item.href === "/"
                ? comparePath === "/"
                : comparePath === item.href ||
                  comparePath.startsWith(`${item.href}/`);
            return (
              <li key={item.href}>
                <button
                  type="button"
                  className={`flex items-center gap-[6px] px-2 py-[9px] text-[13px] transition-colors lg:text-[16px] ${
                    isActive ? "text-primary" : "text-gray-300"
                  }`}
                  onClick={() => handleClick(item.href)}
                >
                  {/* 빨간 점 (활성 메뉴만) */}
                  <div
                    className={`z-1 size-2 rounded-full ${
                      isActive ? "bg-primary" : "bg-gray-600"
                    }`}
                  />
                  <Icon
                    iconKey={item.icon as string}
                    className={`${isActive ? "text-primary" : "text-gray-300"}`}
                    size={24}
                  />
                  <span className="font-medium">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}
