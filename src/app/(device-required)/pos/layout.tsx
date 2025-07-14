import { PropsWithChildren } from "react";
import ClientLayout from "./_components/ClientLayout";

export default function Layout({ children }: PropsWithChildren) {
  const now = new Date().toISOString();

  return <ClientLayout now={now}>{children}</ClientLayout>;
}
