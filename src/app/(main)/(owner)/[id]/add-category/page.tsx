import PageTitle from "@/app/(main)/_components/PageTitle";
import getQueryClient from "@/app/get-query-client";
import { getStoreCategoryList } from "@/lib/api/stores.api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import EditCategoryForm from "./_components/EditCategoryForm";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["category-list", id],
    queryFn: () => getStoreCategoryList(id),
  });
  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageTitle title="메뉴 관리" />
      <EditCategoryForm storeId={id} />
    </HydrationBoundary>
  );
}
