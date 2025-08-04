"use client";

import { useRef } from "react";
import QueryProviders from "@/app/query-providers";
import InfoPopup from "@/components/InfoPopup";
import Icon from "@/components/common/Icon";
import useOverlay from "@/hooks/useOverlay";
import { StoreProvider } from "@/providers/storeProvider";
import { usePathname } from "next/navigation";
import useAuthStore from "@/stores/useAuthStore";
import PAGE_TITLES from "@/constants/pageTitles";

export default function PageTitle({ title }: { title?: string }) {
  const pathname = usePathname();
  const { user } = useAuthStore();

  const ref = useRef<HTMLButtonElement>(null);

  const { open, close } = useOverlay();

  const handleOpenPopup = () => {
    open(() => (
      <QueryProviders>
        <StoreProvider>
          <InfoPopup close={close} />
        </StoreProvider>
      </QueryProviders>
    ));
  };

  const getTitle = () => {
    const path = pathname.split("/")[2];
    if (user?.permission === "OWNER") {
      const ownerTitles = PAGE_TITLES.OWNER;
      if (path) {
        return ownerTitles[pathname.split("/")[2] as keyof typeof ownerTitles];
      }
      return ownerTitles.init;
    }
    if (user?.permission === "ADMIN") {
      const adminTitles = PAGE_TITLES.ADMIN;
      if (pathname.split("/")[1] === "admin") {
        return adminTitles[pathname.split("/")[2] as keyof typeof adminTitles];
      }
    }
    return title;
  };

  return (
    <div className="sticky right-0 left-0 z-50 flex w-full flex-col gap-3 bg-white pt-5 md:gap-2 md:pt-0 lg:gap-5">
      <div className="flex w-full items-center justify-between">
        <h1 className="text-[18px] font-bold md:text-[16px] lg:text-[28px]">
          {getTitle()}
        </h1>
        <button
          type="button"
          ref={ref}
          className="center relative h-8 w-8 rounded-[12px] border border-gray-400 lg:h-12 lg:w-12 lg:rounded-[16px]"
          onClick={handleOpenPopup}
          aria-label="프로필 메뉴 열기"
        >
          <Icon
            iconKey="user"
            size={24}
            className="md:h-6 md:w-6 lg:h-8 lg:w-8"
          />
        </button>
      </div>
      <div className="h-[1px] w-full bg-gray-600" />
    </div>
  );
}
