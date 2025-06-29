import PageTitle from "@/app/(main)/_components/PageTitle";
import getQueryClient from "@/app/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
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
      <PageTitle title="기기 관리" />
      {children}
    </HydrationBoundary>
  );
}
