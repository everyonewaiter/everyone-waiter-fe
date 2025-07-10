import { PropsWithChildren, Suspense } from "react";
import ClientRefWrapper from "../_components/Wrapper";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ClientRefWrapper>{children}</ClientRefWrapper>
    </Suspense>
  );
}
