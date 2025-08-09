import dynamic from "next/dynamic";
import { PropsWithChildren, Suspense } from "react";
import Loading from "@/components/Loading";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import Spinner from "@/components/common/Spinner";
import { getToken } from "@/lib/cookies";
import { serverLogout } from "@/lib/actions/logout";
import MobileHeader from "./_components/MobileLayout/MobileHeader";
import ContentWrapper from "./(owner)/[id]/_components/ContentWrapper";
import getQueryClient from "../get-query-client";
import { getStoreList } from "./(owner)/[id]/store/_api/stores.api";

const Sidebar = dynamic(() => import("./_components/Sidebar/Sidebar"), {
  ssr: true,
  loading: () => <Spinner />,
});

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ id: string }> }>) {
  const queryClient = getQueryClient();

  const { id } = await params;
  const token = await getToken("accessToken");

  await queryClient.prefetchQuery({
    queryKey: ["store-list"],
    queryFn: () => getStoreList(),
  });

  if (!token) {
    await serverLogout();
  }

  return (
    <div className="flex h-screen w-screen flex-col bg-white md:flex-row md:bg-[#F5F5F5]">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Sidebar initialStoreId={id} />
      </HydrationBoundary>
      <div className="flex flex-1 flex-col overflow-hidden md:py-5 md:pr-5 md:pl-0 lg:py-8">
        <MobileHeader />
        <main className="relative flex-1 overflow-hidden rounded-[20px] px-5 md:h-full md:overflow-visible md:bg-white md:px-6 md:py-5 lg:overflow-hidden lg:p-8">
          <Suspense fallback={<Loading />}>
            <div className="flex h-full flex-col">
              <ContentWrapper>{children}</ContentWrapper>
            </div>
          </Suspense>
        </main>
      </div>
    </div>
  );
}
