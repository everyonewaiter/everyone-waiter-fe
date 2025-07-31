import { PropsWithChildren, ReactNode, Suspense } from "react";
import { StoreProvider } from "@/providers/storeProvider";
import { ValidationProvider } from "@/providers/validationProvider";
import ClientModalWrapper from "../../_components/ClientModalWrapper";

export default async function OwnerLayout({
  children,
  modal,
  params,
}: PropsWithChildren<{
  modal: ReactNode;
  params: Promise<{ storeId: string }>;
}>) {
  const { storeId } = await params;

  return (
    <ValidationProvider valid>
      <StoreProvider storeId={storeId}>
        <div className="relative flex h-full flex-col">
          <div className="flex-1">{children}</div>
          <Suspense fallback={<div>로드 중...</div>}>
            <ClientModalWrapper>{modal}</ClientModalWrapper>
          </Suspense>
        </div>
      </StoreProvider>
    </ValidationProvider>
  );
}
