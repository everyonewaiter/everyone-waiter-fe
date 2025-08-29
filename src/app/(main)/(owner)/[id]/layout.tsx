import { PropsWithChildren, ReactNode, Suspense } from "react";
import { StoreProvider } from "@/providers/storeProvider";
import { ValidationProvider } from "@/providers/validationProvider";

export default async function OwnerLayout({
  children,
  modal,
  params,
}: PropsWithChildren<{
  modal: ReactNode;
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;

  return (
    <ValidationProvider valid>
      <StoreProvider storeId={id}>
        <div className="relative flex h-full flex-col">
          <div className="flex-1">{children}</div>
          <Suspense fallback={<div>로드 중...</div>}>{modal}</Suspense>
        </div>
      </StoreProvider>
    </ValidationProvider>
  );
}
