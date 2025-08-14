import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import { getCategories } from "@/app/(main)/(owner)/[id]/menu/_api/menu.api";
import getQueryClient from "@/app/get-query-client";
import PageTitle from "@/app/(main)/_components/PageTitle/PageTitle";
import PAGE_TITLES from "@/constants/pageTitles";
import { categoryKeys } from "./_queries/keys";

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{
  params: Promise<{ id: string }>;
}>) {
  const { id } = await params;
  const queryClient = getQueryClient();
  await queryClient.prefetchQuery({
    queryKey: categoryKeys.all(id),
    queryFn: () => getCategories({ storeId: id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="flex h-full flex-col">
        <PageTitle initialTitle={PAGE_TITLES.OWNER.menu} storeId={id} />

        <div className="relative flex h-full w-full flex-col">{children}</div>
      </div>
    </HydrationBoundary>
  );
}
