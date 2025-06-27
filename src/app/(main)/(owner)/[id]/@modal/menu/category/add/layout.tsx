import { PropsWithChildren } from "react";
import getQueryClient from "@/app/get-query-client";
import { getCategories } from "@/app/(main)/(owner)/[id]/menu/_api/menu.api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import RefLayout from "@/components/modal/RefLayout";
import { categoryKeys } from "../../../../menu/_queries/keys";

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ id: string }> }>) {
  const queryClient = getQueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: categoryKeys.all(id),
    queryFn: () => getCategories({ storeId: id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <RefLayout>{children}</RefLayout>
    </HydrationBoundary>
  );
}
