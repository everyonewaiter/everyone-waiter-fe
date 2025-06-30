import { Suspense } from "react";
import Loading from "@/components/Loading";
import ClientModalWrapper from "../(main)/_components/ClientModalWrapper";

export default function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <Suspense fallback={<Loading />}>
      {children}
      <ClientModalWrapper>{modal}</ClientModalWrapper>
    </Suspense>
  );
}
