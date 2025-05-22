import { TypeChildren } from "@/types";
import dynamic from "next/dynamic";
import { Suspense } from "react";

const ClientLayout = dynamic(() => import("@/components/layout/ClientLayout"));

export default function Layout({ children }: TypeChildren) {
  return (
    <ClientLayout>
      <Suspense fallback={<div>페이지를 불러오는 중입니다</div>}>
        {children}
      </Suspense>
    </ClientLayout>
  );
}
