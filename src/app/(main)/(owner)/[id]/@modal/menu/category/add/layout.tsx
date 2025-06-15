import { PropsWithChildren } from "react";
import getQueryClient from "@/app/get-query-client";
import dynamic from "next/dynamic";
import { getCategories } from "@/lib/api/menu.api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";

const ClientWrapper = dynamic(() => import("./_components/Wrapper"));

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ id: string; deviceId: string }> }>) {
  const queryClient = getQueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["categories", id],
    queryFn: () => getCategories({ storeId: id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <ClientWrapper>{children}</ClientWrapper>
    </HydrationBoundary>
  );
}
