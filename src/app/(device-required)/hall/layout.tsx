import { PropsWithChildren } from "react";
import getQueryClient from "@/app/get-query-client";
import Header from "./_components/Header";
import { orderList } from "./_api/hall.api";

export default async function Layout({ children }: PropsWithChildren) {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["order-list", true],
    queryFn: () => orderList(true),
  });

  return (
    <div className="flex h-screen w-screen flex-col items-center gap-4 bg-gray-700 px-[60px] py-8">
      <Header href="/hall" />
      {children}
    </div>
  );
}
