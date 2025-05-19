import { TypeChildren } from "@/types/common";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ClientLayout = dynamic(() => import("@/components/layout/ClientLayout"));

export default function Layout({ children }: TypeChildren) {
  return (
    <ClientLayout>
      <Suspense fallback={<div>페이지를 불러오는 중입니다</div>}>
        <div className="flex h-full w-full items-center justify-center pt-4 md:hidden">
          {children}
        </div>
        <div className="hidden md:block">{children}</div>
      </Suspense>
    </ClientLayout>
  );
}
