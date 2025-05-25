import { Suspense } from "react";

export default function Layout({ children }: Children) {
  return <Suspense fallback={<div>로딩 중...</div>}>{children}</Suspense>;
}
