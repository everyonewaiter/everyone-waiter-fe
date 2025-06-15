import { PropsWithChildren, ReactNode } from "react";
import ClientModalWrapper from "../../_components/ClientModalWrapper";

export default function OwnerLayout({
  children,
  modal,
}: PropsWithChildren<{ modal: ReactNode }>) {
  return (
    <div className="relative">
      {children}
      <ClientModalWrapper>{modal}</ClientModalWrapper>
    </div>
  );
}
