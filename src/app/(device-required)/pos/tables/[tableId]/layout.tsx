import getQueryClient from "@/app/get-query-client";
import { getPosMenuList } from "../../_api/pos.api";

export default async function Layout({
  children,
  searchParams,
}: {
  children: React.ReactNode;
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const queryClient = getQueryClient();
  const storeId = searchParams?.storeId as string;

  await queryClient.prefetchQuery({
    queryKey: ["pos-menu-list"],
    queryFn: () => getPosMenuList(storeId),
  });

  return children;
}
