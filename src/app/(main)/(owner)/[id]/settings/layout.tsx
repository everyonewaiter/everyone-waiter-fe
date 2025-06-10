import PageTitle from "@/app/(main)/_components/PageTitle";
import getQueryClient from "@/app/get-query-client";
import { getStoreInfoDetail } from "@/lib/api/stores.api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { PropsWithChildren } from "react";

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ id: string }> }>) {
  const queryClient = getQueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["store-detail-info", id],
    queryFn: () => getStoreInfoDetail(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageTitle title="설정" />
      <div className="h-full w-full overflow-y-auto">
        <div className="flex h-full w-full items-start justify-center py-6 md:items-center lg:py-10">
          {children}
        </div>
      </div>
    </HydrationBoundary>
  );
}
