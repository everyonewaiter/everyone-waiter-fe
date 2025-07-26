import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { getStoreInfoDetail } from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import getQueryClient from "@/app/get-query-client";
import { settingsKeys } from "./_queries/keys";

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ id: string }> }>) {
  const queryClient = getQueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: settingsKeys.all(id),
    queryFn: () => getStoreInfoDetail(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="h-full w-full overflow-y-auto">
        <div className="flex h-full w-full items-start justify-center py-6 md:items-center lg:items-start lg:py-10">
          {children}
        </div>
      </div>
    </HydrationBoundary>
  );
}
