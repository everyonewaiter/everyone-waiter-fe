import { HydrationBoundary, dehydrate } from "@tanstack/react-query";
import {
  getCategories,
  getMenuList,
} from "@/app/(main)/(owner)/[id]/menu/_api/menu.api";
import getQueryClient from "@/app/get-query-client";
import { categoryKeys, menuKeys } from "../../../_queries/keys";

export default async function Layout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const queryClient = getQueryClient();
  const { id } = await params;

  await queryClient.prefetchQuery({
    queryKey: categoryKeys.all(id),
    queryFn: () => getCategories({ storeId: id }),
  });

  await queryClient.prefetchQuery({
    queryKey: menuKeys.category(id, ""),
    queryFn: () => getMenuList({ storeId: id, categoryId: "" }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <div className="relative flex min-h-dvh flex-col">{children}</div>
    </HydrationBoundary>
  );
}
