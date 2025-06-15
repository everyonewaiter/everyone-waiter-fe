import MobileHeader from "@/app/(main)/_components/MobileHeader";
import { PropsWithChildren, Suspense } from "react";
import Sidebar from "./_components/Sidebar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Suspense fallback={<div>페이지를 불s러오는 중입니다</div>}>
      <div className="flex h-screen w-screen flex-col overflow-hidden bg-white md:flex-row md:bg-[#F5F5F5]">
        <Sidebar />
        <main className="flex flex-1 flex-col md:py-5 md:pr-5 md:pl-0 lg:py-8">
          <MobileHeader />
          <div className="h-full w-full rounded-[20px] px-5 md:bg-white md:px-6 md:py-5 lg:px-8 lg:pt-0 lg:pb-8">
            {children}
          </div>
        </main>
      </div>
    </Suspense>
  );
}
