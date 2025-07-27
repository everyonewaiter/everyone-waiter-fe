import { PropsWithChildren, Suspense } from "react";
import MobileHeader from "@/app/(main)/_components/MobileHeader";
import Loading from "@/components/Loading";
import Sidebar from "./_components/Sidebar";
import AuthGuard from "./_components/AuthGuard";
import PageTitle from "./_components/PageTitle";

function ContentWrapper({ children }: PropsWithChildren) {
  return (
    <div className="flex h-full flex-col">
      <PageTitle />

      <div className="scrollbar-hide flex-1 overflow-y-auto">
        <AuthGuard>{children}</AuthGuard>
      </div>
    </div>
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
            <ContentWrapper>{children}</ContentWrapper>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
