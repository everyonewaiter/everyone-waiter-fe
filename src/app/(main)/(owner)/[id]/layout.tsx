import { PropsWithChildren, ReactNode } from "react";
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
      <div className="relative">
        {children}
        <ClientModalWrapper>{modal}</ClientModalWrapper>
      </div>
    </StoreProvider>
  );
}
