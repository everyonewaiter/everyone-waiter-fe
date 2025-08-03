import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import getQueryClient from "@/app/get-query-client";
import { getToken } from "@/lib/cookies";
import { getPageTitle } from "@/utils/getPageTitle";
import { getRegisters } from "../(owner)/[id]/store/_api/stores.api";
import { storeKeys } from "../(owner)/[id]/store/_queries/keys";
import PageTitle from "../_components/PageTitle/PageTitle";

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ id: string }> }>) {
  const queryClient = getQueryClient();
  const role = await getToken("role");
  const { id } = await params;

  const pageTitle = getPageTitle(`/${id}`, role);

  await queryClient.prefetchQuery({
    queryKey: storeKeys.list(1),
    queryFn: () => getRegisters(1),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <PageTitle initialTitle={pageTitle} storeId={id} />

      <div className="h-screen w-screen bg-gray-700 lg:px-[60px] lg:py-[32px]">
        <div className="h-full w-full rounded-[32px] bg-white lg:px-8">
          {children}
        </div>
      </div>
    </HydrationBoundary>
  );
}
