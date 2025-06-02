"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { getStoreList } from "@/lib/api/stores.api";
import { useQuery } from "@tanstack/react-query";
import { getComparePath } from "@/utils/getPathname";
import { useStore } from "zustand";
import useAuthStore from "@/stores/useAuthStore";
import MENU_ITEMS from "@/constants/sidebarMenus";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/select";
import Icon from "../../../components/common/Icon";

interface IProps {
  onClose: () => void;
}

export default function MobileSidebarSection({ onClose }: IProps) {
  const navigate = useRouter();

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

  const handleClick = (href: string) => {
    if (permission === "OWNER") {
      navigate.push(`/${selectedStoreId}${href}`);
    } else {
      navigate.push(href);
    }
    onClose();
  };

  return (
    <div className={`${isOwnerWithoutStore ? "md:hidden" : "md:block"}`}>
      <nav>
        {permission === "OWNER" ? (
          <Select value={selectedStoreId} onValueChange={setSelectedStoreId}>
            <SelectTrigger className="bg-primary flex w-full items-center justify-between rounded-xl text-sm font-bold text-white">
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
        <ul className="relative">
          {MENU_ITEMS[permission].length > 1 && (
            <div className="absolute top-[18px] bottom-[18px] left-[11px] w-[2px] bg-gray-600" />
          )}
          {MENU_ITEMS[permission].map((item) => {
            const isActive = comparePath === item.href;
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
