import { PropsWithChildren } from "react";
import getQueryClient from "@/app/get-query-client";
import { getStoreStatus } from "./_api/pos.api";

export default async function Layout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["store-status"],
    queryFn: getStoreStatus,
  });

  return children;
}
