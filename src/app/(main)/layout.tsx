"use client";

import { PropsWithChildren, Suspense, useEffect } from "react";
import Loading from "@/components/Loading";
import { HydrationBoundary } from "@tanstack/react-query";
import { notFound, usePathname, useRouter } from "next/navigation";
import { getClientCookie } from "@/lib/cookies/client";
import Sidebar from "./_components/Sidebar/Sidebar";
import AuthGuard from "./_components/AuthGuard";
import PageTitle from "./_components/PageTitle";
import MobileHeader from "./_components/MobileLayout/MobileHeader";

function ContentWrapper({ children }: PropsWithChildren) {
  return (
    <HydrationBoundary>
      <AuthGuard>{children}</AuthGuard>
    </HydrationBoundary>
  );
}

export default function Layout({ children }: PropsWithChildren) {
  const navigate = useRouter();
  const pathname = usePathname();
  const permission = getClientCookie("permission");

  const storeId = pathname.split("/")[1];

  useEffect(() => {
    if (permission === "OWNER" && !/^\d+$/.test(storeId)) {
      notFound();
    }
  }, [storeId, navigate]);

  return (
    <div className="flex h-screen w-screen flex-col bg-white md:flex-row md:bg-[#F5F5F5]">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden md:py-5 md:pr-5 md:pl-0 lg:py-8">
        <MobileHeader />

        <main className="relative flex-1 overflow-hidden rounded-[20px] px-5 md:h-full md:overflow-visible md:bg-white md:px-6 md:py-5 lg:overflow-hidden lg:p-8">
          <Suspense fallback={<Loading />}>
            <div className="flex h-full flex-col">
              <PageTitle storeId={storeId} />
              <ContentWrapper>{children}</ContentWrapper>
            </div>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
