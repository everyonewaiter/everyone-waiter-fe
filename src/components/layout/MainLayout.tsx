"use client";

/* eslint-disable react-hooks/rules-of-hooks */
import MobileSidebar from "@/app/(main)/_components/MobileSidebar";
import useOverlay from "@/hooks/use-overlay";
import { ReactNode, useEffect } from "react";
import Sidebar from "@/app/(main)/_components/Sidebar";
import { usePathname } from "next/navigation";
import cn from "@/lib/utils";
import useStores from "@/hooks/useStores";
import { useAccount } from "@/hooks/store/useAccount";
import Header from "./Header";

export default function MainLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { acceptedStoresListQuery } = useStores();
  const { setHasAcceptedStore, hasAcceptedStore } = useAccount();
  const { open, close } = useOverlay();

  const preventLayout = ["/login", "/signup"];
  if (preventLayout.includes(pathname)) return children;

  const handleOpenMobile = () => {
    open(() => <MobileSidebar onClose={close} />);
  };

  useEffect(() => {
    const hasStore = acceptedStoresListQuery.data?.stores.length !== 0;
    setHasAcceptedStore(hasStore);
  }, [acceptedStoresListQuery.data?.stores.length]);

  return (
    <div className="min-h-screen w-screen bg-white md:bg-gray-700">
      {!acceptedStoresListQuery.isLoading && !hasAcceptedStore && (
        <div
          className={cn(
            "w-full flex-col",
            "sm:flex",
            "md:flex",
            pathname === "/" ? "h-screen" : "min-h-screen"
          )}
        >
          {pathname !== "/stores" && (
            <Header openMobileSidebar={handleOpenMobile} />
          )}
          <section className="flex h-full w-screen flex-row items-center justify-center rounded-[28px] md:h-[calc(100%-40px)] md:p-5 lg:h-[calc(100%-64px)] lg:min-w-[1458px] lg:p-8">
            {children}
          </section>
        </div>
      )}
      {hasAcceptedStore && !acceptedStoresListQuery.isLoading && (
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
