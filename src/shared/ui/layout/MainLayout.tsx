"use client";

import MobileSidebar from "@/app/(main)/_components/MobileSidebar";
import useOverlay from "@/shared/hooks/useOverlay";
import { ReactNode } from "react";
import Sidebar from "@/app/(main)/_components/Sidebar";
import { usePathname } from "next/navigation";
import cn from "@/shared/lib/utils";
import Header from "./Header";

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const { open, close } = useOverlay();
  const preventLayout = ["/login", "/signup"];
  const isFirstStore = false;

  if (preventLayout.includes(pathname)) return children;

  const handleOpenMobile = () => {
    open(() => <MobileSidebar onClose={close} />);
  };

  return (
    <div className="min-h-screen w-screen bg-white md:bg-gray-700">
      <div
        className={cn(
          "w-full flex-col",
          "sm:flex",
          isFirstStore ? "md:flex" : "md:hidden",
          pathname === "/" ? "h-screen" : "min-h-screen"
        )}
      >
        <Header openMobileSidebar={handleOpenMobile} />
        <section className="flex h-full w-screen flex-row items-center justify-center rounded-[28px] md:h-[calc(100%-40px)] md:p-5 lg:h-[calc(100%-64px)] lg:min-w-[1458px] lg:p-8">
          {children}
        </section>
      </div>
      {!isFirstStore && (
        <div className="md:py:5 hidden h-screen min-w-screen flex-row items-center justify-center gap-6 md:flex lg:py-8">
          <Sidebar />
          <section className="overflow-y-auto rounded-[28px] bg-white md:h-[calc(100%-40px)] md:w-[722px] md:p-5 lg:h-[calc(100%-64px)] lg:w-[1458px] lg:p-8">
            {children}
          </section>
        </div>
      )}
    </div>
  );
}
