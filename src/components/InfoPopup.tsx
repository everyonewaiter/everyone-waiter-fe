"use client";

import axios from "axios";
import { usePathname, useRouter } from "next/navigation";
import { useRef } from "react";
import { useModalCloseTriggers } from "@/hooks/useModalCloseTriggers";
import useAuthStore from "@/stores/useAuthStore";
import Icon from "./common/Icon/Icon";

const popupList = {
  OWNER: [
    {
      text: "매장 등록 신청 현황",
      url: "/",
    },
    // {
    //   text: "구독",
    //   url: "/subscription",
    // }
  ],
};

interface IProps {
  close: () => void;
  storeId?: string;
}

export default function InfoPopup({ close, storeId }: IProps) {
  const ref = useRef<HTMLDivElement>(null);
  const pathname = usePathname();
  const navigate = useRouter();
  const { user } = useAuthStore();

  useModalCloseTriggers({
    ref,
    onClose: close,
  });

  const handleNavigate = (url: string) => {
    navigate.push(url);
    close();
  };

  const handleLogout = async () => {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
    navigate.refresh();
    handleNavigate("/login");
  };

  return (
    <div
      className="fixed z-[9999] flex w-[160px] flex-col gap-1 rounded-[16px] bg-white p-3 shadow-[0_2px_10px_0_rgba(0,0,0,0.08)] md:w-[190px] lg:w-[220px]"
      ref={ref}
      role="menu"
      aria-label="사용자 메뉴"
      style={{
        top: "var(--popup-top, 0px)",
        right: "var(--popup-right, 0px)",
      }}
    >
      <div
        className="flex h-9 w-full items-center gap-1 overflow-hidden rounded-[8px] bg-gray-700 px-2 md:gap-2 lg:h-12 lg:px-4"
        aria-label="사용자 정보"
      >
        <div
          className="flex h-5 w-5 shrink-0 items-center justify-center rounded-[16px] border border-gray-500 bg-white lg:h-7 lg:w-7"
          aria-hidden="true"
        >
          <Icon iconKey="user" size={16} className="h-4 w-4 lg:h-6 lg:w-6" />
        </div>
        <span className="min-w-0 overflow-hidden text-xs text-ellipsis whitespace-nowrap text-gray-100 lg:text-sm">
          {user?.permission === "ADMIN" ? "admin" : user?.email}
        </span>
      </div>

      {popupList[user?.permission as keyof typeof popupList]?.map((item) => (
        <div
          key={item.text}
          role="menuitem"
          tabIndex={0}
          className="flex h-9 w-full cursor-pointer items-center gap-2 rounded-[8px] px-3 lg:px-5"
          aria-label={item.text}
          onClick={() =>
            handleNavigate(
              pathname.startsWith("/main")
                ? `/main/${item.url}`
                : `/${storeId}/${item.url}`
            )
          }
          onKeyDown={(e) => {
            if (e.key === "Enter" || e.key === " ") {
              handleNavigate(`/${storeId}/${item.url}`);
            }
          }}
        >
          <span className="text-s font-regular text-gray-300 lg:text-sm">
            {item.text}
          </span>
        </div>
      ))}
      <button
        type="button"
        className="flex h-9 w-full cursor-pointer items-center gap-2 rounded-[8px] px-3 lg:px-5"
        aria-label="로그아웃"
        onClick={handleLogout}
      >
        <span className="text-s font-regular text-gray-300 lg:text-sm">
          로그아웃
        </span>
      </button>
    </div>
  );
}
