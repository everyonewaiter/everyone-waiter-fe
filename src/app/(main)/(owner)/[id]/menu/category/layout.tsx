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
    <div className="relative flex-1 flex-col">
      {children}
      {modal && <div className="fixed inset-0 z-50">{modal}</div>}
    </div>
  );
}
