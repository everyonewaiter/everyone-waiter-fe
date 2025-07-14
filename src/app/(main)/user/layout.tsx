"use server";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/get-query-client";
import {
  getRegisters,
  getStoreList,
} from "../(owner)/[id]/store/_api/stores.api";
import { storeKeys } from "../(owner)/[id]/store/_queries/keys";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: storeKeys.list(1),
    queryFn: () => getRegisters(1),
    staleTime: 1000 * 60 * 5,
  });

  await queryClient.prefetchQuery({
    queryKey: storeKeys.stores(),
    queryFn: getStoreList,
    staleTime: 1000 * 60 * 5,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
