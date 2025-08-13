import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import getQueryClient from "@/app/get-query-client";
import PageTitle from "@/app/(main)/_components/PageTitle/PageTitle";
import PAGE_TITLES from "@/constants/pageTitles";
import { notFound } from "next/navigation";
import { getStoreList } from "./_api/stores.api";

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ id: string }> }>) {
  const queryClient = getQueryClient();
  const { id } = await params;

  if (!id) notFound();

  await queryClient.prefetchQuery({
    queryKey: ["store-list"],
    queryFn: () => getStoreList(),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageTitle initialTitle={PAGE_TITLES.OWNER.store} storeId={id} />

      <div className="h-full w-full lg:overflow-y-auto">
        <div className="flex h-full w-full items-start justify-center py-6 lg:py-10">
          {children}
        </div>
      </div>
    </HydrationBoundary>
  );
}
