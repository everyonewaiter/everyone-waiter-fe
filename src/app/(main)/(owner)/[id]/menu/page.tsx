import getQueryClient from "@/app/get-query-client";
import { getMenusWithCategory } from "@/lib/api/stores.api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import AllMenu from "./_components/AllMenu";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["menus-with-category", id],
    queryFn: () => getMenusWithCategory(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <AllMenu storeId={id} />
    </HydrationBoundary>
  );
}
