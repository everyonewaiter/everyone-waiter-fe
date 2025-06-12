import { PropsWithChildren, ReactNode } from "react";

export default async function OwnerLayout({
  children,
  modal,
}: PropsWithChildren<{ modal: ReactNode }>) {
  return (
    <div className="relative">
      {children}
      {modal}
    </div>
  );
}
