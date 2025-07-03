import getQueryClient from "@/app/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { getPosMenuList, getTableActivity } from "../../_api/pos.api";

export default async function Layout({
  children,
  searchParams,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const queryClient = getQueryClient();
  const storeId = searchParams?.storeId as string;
  const { id } = await params;
  const tableNo = id;

  await queryClient.prefetchQuery({
    queryKey: ["pos-menu-list"],
    queryFn: () => getPosMenuList(storeId),
    staleTime: 1000 * 60 * 5,
  });

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
