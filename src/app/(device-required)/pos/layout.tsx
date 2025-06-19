import { PropsWithChildren, Suspense } from "react";

export default function PosLayout({ children }: PropsWithChildren) {
  return <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>;
}
