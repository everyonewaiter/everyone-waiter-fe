import { PropsWithChildren, ReactNode } from "react";
import { StoreProvider } from "@/providers/storeProvider";
import ClientModalWrapper from "../../_components/ClientModalWrapper";

export default function OwnerLayout({
  children,
  modal,
  params,
}: PropsWithChildren<{ modal: ReactNode; params: { id: string } }>) {
  const { id } = params;

  return (
    <StoreProvider storeId={id}>
      <div className="relative">
        {children}
        <ClientModalWrapper>{modal}</ClientModalWrapper>
      </div>
    </StoreProvider>
  );
}
