import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import getQueryClient from "@/app/get-query-client";
import { getRegisters } from "../(owner)/[id]/store/_api/stores.api";
import { storeKeys } from "../(owner)/[id]/store/_queries/keys";

export default async function Layout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: storeKeys.list(1),
    queryFn: () => getRegisters(1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="h-screen w-screen bg-gray-700 lg:px-[60px] lg:py-[32px]">
        <div className="h-full w-full rounded-[32px] bg-white lg:px-8">
          {children}
        </div>
      </div>
    </HydrationBoundary>
  );
}
