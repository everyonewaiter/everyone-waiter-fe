import { PropsWithChildren, ReactNode } from "react";

export default async function Layout({
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
