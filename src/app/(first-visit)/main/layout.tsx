import {
  getRegisters,
  getStoreList,
} from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import { storeKeys } from "@/app/(main)/(owner)/[id]/store/_queries/keys";
import getQueryClient from "@/app/get-query-client";
import { getToken, setCookie } from "@/lib/cookies";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { redirect } from "next/navigation";
import { PropsWithChildren } from "react";

export default async function Layout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  const permission = await getToken("permission");
  const page = 1;

  await queryClient.prefetchQuery({
    queryKey: storeKeys.list(page),
    queryFn: () => getRegisters(page),
  });

  const stores = await getStoreList();

  if (permission === "USER" && (stores.stores?.length ?? 0) > 0) {
    await setCookie("permission", "OWNER");
    redirect(`/${stores.stores[0].storeId}`);
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-white md:bg-gray-700">
      <HydrationBoundary state={dehydrate(queryClient)}>
        {children}
      </HydrationBoundary>
    </div>
  );
}
