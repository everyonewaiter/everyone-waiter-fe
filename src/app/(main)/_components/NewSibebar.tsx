"use client";

import useAuthStore from "@/stores/useAuthStore";
import Image from "next/image";
import { useStore } from "zustand";
import Link from "next/link";
import { usePathname } from "next/navigation";
import ICON_MAP from "@/components/icons";

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
  ],
  USER: [{ icon: "home", label: "홈", href: "/" }],
};

export default function NewSidebar() {
  const { user } = useStore(useAuthStore, (state) => state);
  const permission = user?.permission || "USER";
  const pathname = usePathname();

  const menuItems = MENU_ITEMS[permission];

  return (
    <div className="hidden w-[318px] py-8 pl-[60px] md:block">
      <aside className="flex h-full flex-col rounded-[28px] bg-white px-5 pt-8">
        <div className="mb-10 flex items-center justify-center gap-[18px]">
          <Image
            src="/icons/logo/logo.svg"
            alt="모두의 웨이터 로고"
            width={40}
            height={40}
          />
          <h1 className="font-hakgyo text-primary text-2xl">모두의 웨이터</h1>
        </div>

        <nav className="flex flex-col gap-4">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const IconComponent = ICON_MAP[item.icon];

            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 rounded-lg px-4 py-3 transition-colors ${
                  isActive
                    ? "bg-primary/10 text-primary"
                    : "text-gray-600 hover:bg-gray-100"
                }`}
              >
                <IconComponent
                  className={`size-6 ${isActive ? "text-primary" : "text-gray-500"}`}
                />
                <span className="font-medium">{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </div>
  );
}
