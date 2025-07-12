import { PropsWithChildren } from "react";
import MobileHeader from "@/app/(main)/_components/MobileHeader";
import Sidebar from "./_components/Sidebar";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="flex min-h-screen w-screen flex-col bg-white md:flex-row md:bg-[#F5F5F5]">
      <Sidebar />
      <main className="flex flex-1 flex-col md:py-5 md:pr-5 md:pl-0 lg:py-8">
        <MobileHeader />
        <div className="h-full w-full rounded-[20px] px-5 md:bg-white md:px-6 md:py-5 lg:px-8 lg:pt-0 lg:pb-8">
          {children}
        </div>
      </main>
    </div>
  );
}
