import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import getQueryClient from "@/app/get-query-client";
import PageTitle from "@/app/(main)/_components/PageTitle/PageTitle";
import PAGE_TITLES from "@/constants/pageTitles";
import { getDevices } from "./_api/device.api";

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ id: string }> }>) {
  const queryClient = getQueryClient();
  const { id } = await params;
  await queryClient.prefetchQuery({
    queryKey: ["get-devices", id],
    queryFn: () => getDevices(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageTitle initialTitle={PAGE_TITLES.OWNER.device} storeId={id} />

      {children}
    </HydrationBoundary>
  );
}
