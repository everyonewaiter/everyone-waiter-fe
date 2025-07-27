"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
import { getStoreList } from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import { getClientPermission } from "@/lib/cookies/client";
import SidebarMenu from "./SidebarMenu";

const StoreSelect = dynamic(() => import("./StoreSelect"), {
  ssr: false,
  loading: () => null,
});

export default function Sidebar() {
  const navigate = useRouter();
  const permission =
    getClientPermission() ||
    (typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("authStore") || "{}")?.state?.user
          ?.permission
      : null);

  const [selectedStoreId, setSelectedStoreId] = useState<string>("");

  // OWNER인 경우에만 매장 목록 조회
  const { data: storeList } = useQuery({
    queryKey: ["store-list"],
    queryFn: getStoreList,
    enabled: permission === "OWNER",
  });

  const isOwnerWithoutStore =
    permission === "OWNER" && storeList?.stores.length === 0;

  return (
    <aside
      className={`hidden md:py-5 md:pr-3 md:pl-5 lg:py-8 lg:pl-[60px] ${isOwnerWithoutStore ? "md:hidden" : "md:block"}`}
    >
      <div className="flex h-full flex-col rounded-[28px] bg-white px-3 pt-4 md:w-[186px] lg:w-[318px] lg:px-5 lg:pt-8">
        <button
          type="button"
          className="mb-6 flex items-center gap-[18px] lg:mb-9"
          onClick={() => navigate.push(`/${selectedStoreId}`)}
        >
          <Image
            src="/logo/logo.svg"
            alt="모두의 웨이터 로고"
            width={40}
            height={40}
            priority
          />
          <h1 className="font-hakgyo text-primary text-[16px] lg:text-2xl">
            모두의 웨이터
          </h1>
        </button>
        <nav>
          {permission === "OWNER" ? (
            <StoreSelect
              storeList={storeList?.stores}
              selectedStoreId={selectedStoreId}
              setSelectedStoreId={setSelectedStoreId}
            />
          ) : (
            <div className="bg-primary flex w-full items-center justify-between rounded-xl py-[12.5px] pl-4 lg:py-[14.5px] lg:pl-5">
              <h1 className="text-[15px] font-bold text-white lg:text-[18px]">
                관리자
              </h1>
            </div>
          )}
          <SidebarMenu
            selectedStoreId={selectedStoreId}
            permission={permission}
          />
        </nav>
      </div>
    </aside>
  );
}
