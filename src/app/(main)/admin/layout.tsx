import { PropsWithChildren, ReactNode } from "react";

export default function OwnerLayout({
  children,
  modal,
}: PropsWithChildren<{ modal: ReactNode }>) {
  return (
    <>
      {children}
      {modal}
    </>
  );
}
