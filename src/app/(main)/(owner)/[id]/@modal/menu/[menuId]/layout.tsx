import { PropsWithChildren, Suspense } from "react";
import ClientRefWrapper from "../_components/Wrapper";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ClientRefWrapper className="md:h-[calc(100%-48px)] md:w-[calc(100%-48px)] lg:max-h-[832px] lg:max-w-[1344px]">
        {children}
      </ClientRefWrapper>
    </Suspense>
  );
}
