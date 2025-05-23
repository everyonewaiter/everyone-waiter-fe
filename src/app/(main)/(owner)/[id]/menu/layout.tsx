import PageTitle from "@/app/(main)/_components/PageTitle";
import getQueryClient from "@/app/get-query-client";
import { getStoreCategoryList } from "@/lib/api/stores.api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import CategoryList from "./_components/CategoryList";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["category-list", id],
    queryFn: () => getStoreCategoryList(id),
  });

  console.log("메뉴 레이아웃 렌더링");

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageTitle title="메뉴 관리" />
      <CategoryList storeId={id} />
      {children}
    </HydrationBoundary>
  );
}
