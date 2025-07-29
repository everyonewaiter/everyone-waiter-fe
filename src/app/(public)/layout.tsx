"use client";

import { PropsWithChildren, ReactNode, Suspense } from "react";
import Loading from "@/components/Loading";
import Guard from "./_component/Guard";

export default function Layout({
  children,
  modal,
}: PropsWithChildren<{ modal: ReactNode }>) {
  return (
    <Suspense fallback={<Loading />}>
      <Guard>
        {children}
        {modal}
      </Guard>
    </Suspense>
  );
}
