import { PropsWithChildren, Suspense } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return <Suspense fallback={<div>로딩 중...</div>}>{children}</Suspense>;
}
