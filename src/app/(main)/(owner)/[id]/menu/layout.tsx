import PageTitle from "@/app/(main)/_components/PageTitle";
import getQueryClient from "@/app/get-query-client";
import { getCategories } from "@/lib/api/menu.api";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { PropsWithChildren, ReactNode } from "react";

export default async function Layout({
  children,
  params,
  modal,
}: PropsWithChildren<{
  params: Promise<{ id: string }>;
  modal: ReactNode;
}>) {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["categories", id],
    queryFn: () => getCategories({ storeId: id }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="relative flex min-h-screen flex-col">
        <PageTitle title="메뉴 관리" />
        {children}
        {modal && modal}
      </div>
    </HydrationBoundary>
  );
}
