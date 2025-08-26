import { PropsWithChildren, ReactNode } from "react";
import { notFound } from "next/navigation";

export default async function Layout({
  children,
  modal,
  searchParams,
}: PropsWithChildren<{
  modal: ReactNode;
  searchParams: Promise<{ accessToken: string; storeId: string }>;
}>) {
  const { accessToken, storeId } = await searchParams;

  if (!accessToken || !storeId) notFound();

  return (
    <>
      {children}
      {modal}
    </>
  );
}
