import { PropsWithChildren, ReactNode, Suspense } from "react";
import { StoreProvider } from "@/providers/storeProvider";
import ClientModalWrapper from "../../_components/ClientModalWrapper";

export default async function OwnerLayout({
  children,
  modal,
  params,
}: PropsWithChildren<{ modal: ReactNode; params: Promise<{ id: string }> }>) {
  const { id } = await params;

  return (
    <StoreProvider storeId={id}>
      <div className="relative flex h-full flex-col overflow-hidden">
        <div className="flex-1">{children}</div>
        <Suspense fallback={<div>로드 중...</div>}>
          <ClientModalWrapper>{modal}</ClientModalWrapper>
        </Suspense>
      </div>
    </StoreProvider>
  );
}
