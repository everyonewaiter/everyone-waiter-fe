import type { ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  // modal?: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      {children}
      {/* {modal} */}
    </>
  );
}
