import { Suspense } from "react";
import ClientModalWrapper from "../(main)/_components/ClientModalWrapper";

export default async function Layout({
  children,
  modal,
}: {
  children: React.ReactNode;
  modal: React.ReactNode;
}) {
  return (
    <>
      {children}
      <Suspense fallback={<div>로드 중...</div>}>
        <ClientModalWrapper>{modal}</ClientModalWrapper>
      </Suspense>
    </>
  );
}
