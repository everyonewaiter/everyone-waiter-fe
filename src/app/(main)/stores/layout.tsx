import PageTitle from "@/app/(main)/_components/PageTitle";
import getQueryClient from "@/app/get-query-client";
import { PropsWithChildren } from "react";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { storeKeys } from "../(owner)/[id]/store/_queries/keys";
import { getRegisters } from "../(owner)/[id]/store/_api/stores.api";

export default async function Layout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: storeKeys.list(1),
    queryFn: () => getRegisters(1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="h-screen w-screen bg-gray-700 lg:px-[60px] lg:py-[32px]">
        <div className="h-full w-full rounded-[32px] bg-white lg:px-8">
          <PageTitle title="매장 등록 신청 현황" />
          {children}
        </div>
      </div>
    </HydrationBoundary>
  );
}
