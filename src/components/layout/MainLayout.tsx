"use client";

/* eslint-disable react-hooks/rules-of-hooks */
import MobileSidebar from "@/app/(main)/_components/MobileSidebar";
import useOverlay from "@/hooks/use-overlay";
import { ReactNode } from "react";
import Sidebar from "@/app/(main)/_components/Sidebar";
import { usePathname } from "next/navigation";
import cn from "@/lib/utils";
import useStores from "@/hooks/useStores";
import QueryProviders from "@/app/query-providers";
import Header from "./Header";
import LayoutWithHeader from "./LayoutWithHeader";

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  const { open, close } = useOverlay();
  const { acceptedStoresListQuery } = useStores();
  const { data } = acceptedStoresListQuery(!pathname.startsWith("/control"));
  const hasAcceptedStore = data?.stores.length !== 0;

  const preventLayout = ["/login", "/signup"];
  if (preventLayout.includes(pathname)) return children;

  const handleOpenMobile = () => {
    open(() => (
      <QueryProviders>
        <MobileSidebar onClose={close} />
      </QueryProviders>
    ));
  };

  return (
    <div className="w-screen bg-white md:bg-gray-700">
      {!hasAcceptedStore || pathname.startsWith("/control") ? (
        <div>
          <LayoutWithHeader openPopup={handleOpenMobile}>
            {children}
          </LayoutWithHeader>
          <div
            className={cn(
              "w-full flex-col md:flex",
              "sm:hidden",
              pathname === "/" ? "h-screen" : "min-h-screen",
              pathname === "/stores" ? "items-center justify-center" : ""
            )}
          >
            <div className={cn("block", pathname === "/stores" && "md:hidden")}>
              <Header openMobileSidebar={handleOpenMobile} />
            </div>
            <section
              className={cn(
                "flex w-screen flex-row items-center justify-center rounded-[28px] md:h-[calc(100%-40px)] md:p-5 lg:h-[calc(100%-64px)] lg:min-w-[1458px] lg:p-8",
                pathname === "/stores"
                  ? "!h-[calc(100vh-30px)] rounded-[32px] bg-white lg:w-[1800px]"
                  : ""
              )}
            >
              {children}
            </section>
          </div>
        </div>
      ) : (
        <div>
          <LayoutWithHeader openPopup={handleOpenMobile}>
            {children}
          </LayoutWithHeader>
          <div className="md:py:5 hidden h-screen min-w-screen flex-row items-center justify-center gap-6 md:flex lg:py-8">
            <Sidebar />
            <section className="overflow-y-auto rounded-[28px] bg-white md:h-[calc(100%-40px)] md:w-[722px] md:p-5 lg:h-[calc(100%-64px)] lg:w-[1458px] lg:p-8">
              {children}
            </section>
          </div>
        </div>
      )}
    </div>
  );
}
