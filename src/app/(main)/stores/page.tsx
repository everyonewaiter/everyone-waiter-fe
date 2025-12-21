import getQueryClient from "@/app/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { storeKeys } from "../(owner)/[id]/store/_queries/keys";
import { getRegisters } from "../(owner)/[id]/store/_api/stores.api";
import StoreList from "./_components/_templates/StoreList";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id?: string }>;
}) {
  const { id } = await searchParams;

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: storeKeys.list(1),
    queryFn: () => getRegisters(1),
  });

  return (
    <div className="h-full">
      <HydrationBoundary state={dehydrate(queryClient)}>
        {id && <StoreList storeId={id} />}
      </HydrationBoundary>
    </div>
  );
}
