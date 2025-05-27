import getQueryClient from "@/app/get-query-client";
import { getMenusByCategory } from "@/lib/api/stores.api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import MenusByCategory from "../_components/MenusByCategory";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; categoryId: string }>;
}) {
  const { id, categoryId } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["menus-by-category", id, categoryId],
    queryFn: () => getMenusByCategory(id, categoryId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <MenusByCategory storeId={id} categoryId={categoryId} />
    </HydrationBoundary>
  );
}
