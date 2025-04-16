"use client";

import MobileSidebar from "@/app/(main)/_components/MobileSidebar";
import useOverlay from "@/hooks/use-overlay";
import { ReactNode, useState } from "react";
import Sidebar from "@/app/(main)/_components/Sidebar";
import { USER_MENU } from "@/constants/sidebarMenus";
import { usePathname } from "next/navigation";
import Header from "./Header";

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const { open, close } = useOverlay();
  const [activeMenu, setActiveMenu] = useState("");
  const preventLayout = ["/login", "/signup"];
  const preventHeader = ["/stores"];
  const isFirstStore = false;

  if (preventLayout.includes(pathname)) return children;

  const handleOpenMobile = () => {
    open(() => <MobileSidebar onClose={close} />);
  };

  return (
    <div className="min-h-screen w-screen bg-white md:bg-gray-700">
      {isFirstStore || window.innerWidth < 360 ? (
        <div
          className={`flex w-full flex-col ${pathname === "/" ? "h-screen" : "min-h-screen"}`}
        >
          {!preventHeader.includes(pathname) && (
            <Header openMobileSidebar={handleOpenMobile} />
          )}
          <section className="flex h-full w-screen flex-row items-center justify-center rounded-[28px] md:h-[calc(100%-40px)] md:p-5 lg:h-[calc(100%-64px)] lg:w-[1458px] lg:p-8">
            {children}
          </section>
        </div>
      ) : (
        <div className="md:py:5 hidden h-screen min-w-screen flex-row items-center justify-center gap-6 md:flex lg:py-8">
          <Sidebar
            activeMenu={activeMenu}
            setActiveMenu={setActiveMenu}
            data={USER_MENU}
          />
          <section className="overflow-y-auto rounded-[28px] bg-white md:h-[calc(100%-40px)] md:w-[722px] md:p-5 lg:h-[calc(100%-64px)] lg:w-[1458px] lg:p-8">
            {children}
          </section>
        </div>
      )}
    </div>
  );
}
