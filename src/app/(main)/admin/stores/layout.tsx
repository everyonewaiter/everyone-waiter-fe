import { PropsWithChildren, ReactNode } from "react";

export default function Layout({
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
