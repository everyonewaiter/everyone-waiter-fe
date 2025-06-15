import PageTitle from "@/app/(main)/_components/PageTitle";
import { PropsWithChildren, ReactNode } from "react";

export default async function Layout({
  children,
  // params,
  modal,
}: PropsWithChildren<{
  // params: Promise<{ id: string }>;
  modal: ReactNode;
}>) {
  // const { id } = await params;

  return (
    <div className="relative flex h-full flex-col">
      <PageTitle title="메뉴 관리" />
      <div className="flex min-h-screen flex-1 flex-col">{children}</div>
      {modal && <div className="fixed inset-0 z-50">{modal}</div>}
    </div>
  );
}
