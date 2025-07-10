"use server";

import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import getQueryClient from "@/app/get-query-client";
import { getTableActivity } from "../../_api/pos.api";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const queryClient = getQueryClient();
  const { id } = await params;
  const tableNo = id;

  await queryClient.prefetchQuery({
    queryKey: ["table", tableNo],
    queryFn: () => getTableActivity({ tableNo: Number(tableNo) }),
    staleTime: 1000 * 60 * 5,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      {children}
    </HydrationBoundary>
  );
}
