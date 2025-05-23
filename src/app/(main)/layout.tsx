import MobileHeader from "@/app/(main)/_components/MobileHeader";
import { Suspense } from "react";
import NewSidebar from "./_components/NewSidebar";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <Suspense fallback={<div>페이지를 불러오는 중입니다</div>}>
      <div className="flex h-screen w-screen flex-col bg-white md:flex-row md:bg-[#F5F5F5]">
        <NewSidebar />
        <MobileHeader />
        <main className="flex flex-1 flex-col rounded-[20px] px-5 py-6 md:mx-8 md:my-8 md:bg-white md:px-6 md:py-5 lg:py-8">
          {children}
        </main>
      </div>
    </Suspense>
  );
}
