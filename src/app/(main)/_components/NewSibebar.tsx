"use client";

import useAuthStore from "@/stores/useAuthStore";
import Image from "next/image";
import { useStore } from "zustand";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ICON_MAP from "@/components/icons";
import { useState } from "react";
import { Button } from "@/components/common/NewButton";
import { ChevronDown, ChevronUp } from "lucide-react";

type IconKey = keyof typeof ICON_MAP;

interface MenuItem {
  icon: IconKey;
  label: string;
  href: string;
}

// 권한별 메뉴 구성
const MENU_ITEMS: Record<Permission, MenuItem[]> = {
  ADMIN: [
    { icon: "home", label: "홈", href: "/" },
    { icon: "people", label: "회원 관리", href: "/admin/users" },
    { icon: "shop", label: "매장 관리", href: "/admin/stores" },
    { icon: "check", label: "매장 등록 승인", href: "/admin/approvals" },
    { icon: "subscribe", label: "구독 관리", href: "/admin/subscriptions" },
    { icon: "write", label: "게시글 관리", href: "/admin/posts" },
  ],
  OWNER: [
    { icon: "home", label: "홈", href: "/" },
    { icon: "shop", label: "매장 정보", href: "/owner/store" },
    { icon: "menu", label: "메뉴 관리", href: "/owner/menu" },
    { icon: "subscribe", label: "구독 설정", href: "/owner/subscription" },
    { icon: "pos", label: "POS", href: "/owner/pos" },
    { icon: "setting", label: "설정", href: "/owner/settings" },
  ],
  USER: [{ icon: "home", label: "홈", href: "/" }],
};

export default function NewSidebar() {
  const { user } = useStore(useAuthStore, (state) => state);
  const permission = user?.permission || "USER";
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);

  const menuItems = MENU_ITEMS[permission];

  return (
    <div className="hidden py-8 pl-[60px] md:block">
      <aside className="flex h-full flex-col rounded-[28px] bg-white pt-8 md:w-[186px] md:px-3 lg:w-[318px] lg:px-5">
        <div className="mb-6 flex items-center justify-center gap-[18px]">
          <Image
            src="/icons/logo/logo.svg"
            alt="모두의 웨이터 로고"
            width={40}
            height={40}
          />
          <h1 className="font-hakgyo text-primary md:text-[16px] lg:text-2xl">
            모두의 웨이터
          </h1>
        </div>
        <nav>
          <Button
            variant="primary"
            type="button"
            onClick={() => setIsOpen(!isOpen)}
            className="flex w-full items-center justify-between rounded-xl"
          >
            모두의 웨이터
            {isOpen ? (
              <ChevronDown className="size-6" />
            ) : (
              <ChevronUp className="size-6" />
            )}
          </Button>
          {isOpen && (
            <ul className="relative mt-2">
              {menuItems.length > 1 && (
                <div className="absolute top-[18px] bottom-[18px] left-[11px] w-[2px] bg-gray-600" />
              )}
              {menuItems.map((item) => {
                const isActive = pathname === item.href;
                const IconComponent = ICON_MAP[item.icon];
                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`flex items-center gap-3 px-2 py-[9px] text-[13px] transition-colors ${
                        isActive ? "text-primary" : "text-gray-300"
                      }`}
                    >
                      {/* 빨간 점 (활성 메뉴만) */}
                      <div
                        className={`z-1 size-2 rounded-full ${
                          isActive ? "bg-primary" : "bg-gray-600"
                        }`}
                      />
                      <IconComponent
                        className={`size-6 ${isActive ? "text-primary" : "text-gray-300"}`}
                      />
                      <span className="font-medium">{item.label}</span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </nav>
      </aside>
    </div>
  );
}
