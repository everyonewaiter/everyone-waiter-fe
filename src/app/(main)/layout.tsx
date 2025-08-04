import { PropsWithChildren, Suspense } from "react";
import Loading from "@/components/Loading";
import { HydrationBoundary } from "@tanstack/react-query";
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
  return (
    <div className="flex h-screen w-screen flex-col bg-white md:flex-row md:bg-[#F5F5F5]">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden md:py-5 md:pr-5 md:pl-0 lg:py-8">
        <MobileHeader />

        <main className="relative flex-1 overflow-hidden rounded-[20px] px-5 md:h-full md:overflow-visible md:bg-white md:px-6 md:py-5 lg:overflow-hidden lg:p-8">
          <Suspense fallback={<Loading />}>
            <div className="flex h-full flex-col">
              <PageTitle />
              <ContentWrapper>{children}</ContentWrapper>
            </div>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
