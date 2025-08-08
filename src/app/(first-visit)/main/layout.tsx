import { getRegisters } from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import { storeKeys } from "@/app/(main)/(owner)/[id]/store/_queries/keys";
import getQueryClient from "@/app/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: storeKeys.list(1),
    queryFn: () => getRegisters(1),
  });

  return (
    <div className="flex h-screen w-screen flex-col bg-white md:bg-gray-700">
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </div>
  );
}
