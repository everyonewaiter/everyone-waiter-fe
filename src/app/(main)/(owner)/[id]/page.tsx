import StoreList from "@/app/(main)/stores/_components/_templates/StoreList";
import getQueryClient from "@/app/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import PAGE_TITLES from "@/constants/pageTitles";
import { redirect } from "next/navigation";
import PageTitle from "../../_components/PageTitle/PageTitle";
import { storeKeys } from "./store/_queries/keys";
import { getRegisters, getStoreList } from "./store/_api/stores.api";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const storeList = await getStoreList();

  if (!storeList?.stores?.length) redirect("/main");

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: storeKeys.list(1),
    queryFn: () => getRegisters(1),
  });

  return (
    <div className="mt-5 h-full md:mt-0">
      <PageTitle initialTitle={PAGE_TITLES.OWNER.init} storeId={id as string} />
      <HydrationBoundary state={dehydrate(queryClient)}>
        <StoreList storeId={id} />
      </HydrationBoundary>
    </div>
  );
}
