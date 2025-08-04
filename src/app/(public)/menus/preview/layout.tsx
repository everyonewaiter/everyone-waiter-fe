import Spinner from "@/components/common/Spinner";
import { Suspense, type ReactNode } from "react";

type LayoutProps = {
  children: ReactNode;
  // modal?: ReactNode;
};

export default function Layout({ children }: LayoutProps) {
  return (
    <>
      <Suspense fallback={<Spinner />}>{children}</Suspense>
      {/* {modal} */}
    </>
  );
}
