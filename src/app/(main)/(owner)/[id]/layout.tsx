import { PropsWithChildren, ReactNode, Suspense } from "react";
import { StoreProvider } from "@/providers/storeProvider";
import ClientModalWrapper from "../../_components/ClientModalWrapper";

export default async function OwnerLayout({
  children,
  modal,
}: PropsWithChildren<{ modal: ReactNode }>) {
  return (
    <StoreProvider>
      <div className="relative flex h-full flex-col">
        <div className="flex-1">{children}</div>
        <Suspense fallback={<div>로드 중...</div>}>
          <ClientModalWrapper>{modal}</ClientModalWrapper>
        </Suspense>
      </div>
    </StoreProvider>
  );
}
