import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import PageTitle from "@/app/(main)/_components/PageTitle";
import getQueryClient from "@/app/get-query-client";
import { getStoreInfoDetail } from "./_api/stores.api";
import { storeKeys } from "./_queries/keys";

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
      <div className="flex h-full flex-col overflow-hidden">
        <PageTitle title="매장 정보" />
        <div className="flex-1 md:overflow-y-auto lg:overflow-hidden">
          {children}
        </div>
      </div>
    </HydrationBoundary>
  );
}
