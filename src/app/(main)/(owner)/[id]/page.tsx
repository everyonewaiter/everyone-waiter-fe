import StoreList from "@/app/(main)/stores/_components/_templates/StoreList";
import getQueryClient from "@/app/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import PAGE_TITLES from "@/constants/pageTitles";
import PageTitle from "../../_components/PageTitle/PageTitle";
import { storeKeys } from "./store/_queries/keys";
import { getRegisters } from "./store/_api/stores.api";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: storeKeys.list(1),
    queryFn: () => getRegisters(1),
  });

  return (
    <div className="h-full">
      <PageTitle initialTitle={PAGE_TITLES.OWNER.init} storeId={id as string} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <StoreList storeId={id} />
      </HydrationBoundary>
    </div>
  );
}
