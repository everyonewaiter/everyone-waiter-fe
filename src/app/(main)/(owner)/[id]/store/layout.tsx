import PageTitle from "@/app/(main)/_components/PageTitle";
import getQueryClient from "@/app/get-query-client";
import { PropsWithChildren } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { storeKeys } from "./_queries/keys";
import { getStoreInfoDetail } from "./_api/stores.api";

export const metadata = {
  title: "모두의 웨이터 - 매장 정보",
  description: "매장 정보를 확인하고 수정할 수 있는 페이지입니다.",
};

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ id: string }> }>) {
  const queryClient = getQueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: storeKeys.detail(id),
    queryFn: () => getStoreInfoDetail(id),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageTitle title="매장 정보" />
      {children}
    </HydrationBoundary>
  );
}
