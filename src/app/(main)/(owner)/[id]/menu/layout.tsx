import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import { PropsWithChildren } from "react";
import {
  getCategories,
  getMenuList,
} from "@/app/(main)/(owner)/[id]/menu/_api/menu.api";
import PageTitle from "@/app/(main)/_components/PageTitle";
import getQueryClient from "@/app/get-query-client";
import { categoryKeys, menuKeys } from "./_queries/keys";

export default async function Layout({
  children,
  params,
  // modal,
}: PropsWithChildren<{
  params: Promise<{ id: string }>;
  // modal: ReactNode;
}>) {
  const { id } = await params;
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: categoryKeys.all(id),
    queryFn: () => getCategories({ storeId: id }),
  });

  await queryClient.prefetchQuery({
    queryKey: menuKeys.menu(id, ""),
    queryFn: () => getMenuList({ storeId: id, categoryId: "" }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="relative flex min-h-screen flex-col">
        <PageTitle title="메뉴 관리" />
        {children}
        {/* {modal} */}
      </div>
    </HydrationBoundary>
  );
}
