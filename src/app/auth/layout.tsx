import { TypeChildren } from "@/types";
import { Suspense } from "react";

export default function Layout({ children }: TypeChildren) {
  return <Suspense fallback={<div>로딩 중...</div>}>{children}</Suspense>;
}
