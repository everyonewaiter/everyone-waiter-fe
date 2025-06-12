import PageTitle from "@/app/(main)/_components/PageTitle";
import getQueryClient from "@/app/get-query-client";
import { getDevices } from "@/lib/api/device.api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { PropsWithChildren, ReactNode } from "react";

export default async function Layout({
  children,
  params,
  modal,
}: PropsWithChildren<{ params: Promise<{ id: string }>; modal: ReactNode }>) {
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
      {modal && <div className="fixed inset-0 z-50">{modal}</div>}
    </HydrationBoundary>
  );
}
