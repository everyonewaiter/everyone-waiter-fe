import getQueryClient from "@/app/get-query-client";
import { getPosMenuList, getTableActivity } from "../../_api/pos.api";

export default async function Layout({
  children,
  searchParams,
  params,
}: {
  children: React.ReactNode;
  params: { tableNo: string };
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const queryClient = getQueryClient();
  const storeId = searchParams?.storeId as string;

  await queryClient.prefetchQuery({
    queryKey: ["pos-menu-list"],
    queryFn: () => getPosMenuList(storeId),
  });

  await queryClient.prefetchQuery({
    queryKey: ["table", params.tableNo],
    queryFn: () => getTableActivity({ tableNo: Number(params.tableNo) }),
  });

  return children;
}
