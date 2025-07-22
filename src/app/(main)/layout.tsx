import { PropsWithChildren } from "react";
import MobileHeader from "@/app/(main)/_components/MobileHeader";
import Sidebar from "./_components/Sidebar";
import AuthGuard from "./_components/AuthGuard";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex h-screen w-screen flex-col overflow-hidden bg-white md:flex-row md:bg-[#F5F5F5]">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden md:py-5 md:pr-5 md:pl-0 lg:py-8">
        <MobileHeader />
        <main className="flex-1 overflow-y-auto rounded-[20px] px-5 md:bg-white md:px-6 md:py-5 lg:p-8">
          <AuthGuard>{children}</AuthGuard>
        </main>
      </div>
    </div>
  );
}
