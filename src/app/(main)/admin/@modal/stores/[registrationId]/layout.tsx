"use client";

import ClientRefWrapper from "@/app/(main)/(owner)/[id]/@modal/menu/_components/Wrapper";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <ClientRefWrapper className="w-[320px] px-4 py-5 md:w-[364px] md:p-5 lg:w-[540px] lg:p-8">
      <div className="scrollbar-hide flex h-full w-full flex-col md:gap-5 lg:gap-8">
        {children}
      </div>
    </ClientRefWrapper>
  );
}
