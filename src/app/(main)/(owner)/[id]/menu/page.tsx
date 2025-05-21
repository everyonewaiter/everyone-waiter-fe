import getQueryClient from "@/app/get-query-client";
import { getStoreCategoryList } from "@/lib/api/stores.api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import CategoryList from "./_components/CategoryList";

export default async function page(props: Promise<{ params: { id: string } }>) {
  const { params } = await props;
  const storeId = params.id;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["category-list", storeId],
    queryFn: () => getStoreCategoryList(storeId),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <CategoryList storeId={storeId} />
    </HydrationBoundary>
  );
}
