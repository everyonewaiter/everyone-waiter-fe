import { PropsWithChildren } from "react";
import getQueryClient from "@/app/get-query-client";
import { getStoreStatus } from "./_api/pos.api";
import ClientLayout from "./_components/ClientLayout";

export default async function Layout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["store-status"],
    queryFn: getStoreStatus,
  });

  const now = new Date().toISOString();

  return <ClientLayout now={now}>{children}</ClientLayout>;
}
