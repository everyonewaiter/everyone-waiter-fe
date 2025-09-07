import { Metadata } from "next";
import { Suspense } from "react";
import Spinner from "@/components/common/Spinner";
import getQueryClient from "@/app/get-query-client";
import { redirect } from "next/navigation";
import { getTeamsFrontOfMe } from "../../_api/public.api";
import MyTurnPage from "../_components/_templates/MyTurnPage";

export const metadata: Metadata = {
  title: "내 순서 확인하기",
  description: "내 순서를 확인할 수 있다..",
  icons: {
    icon: "/logo/logo.svg",
  },
};

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ storeId: string; accessKey: string }>;
}) {
  const { storeId, accessKey } = await searchParams;

  if (!accessKey) {
    throw new Error("필수 파라미터가 누락되었습니다.");
  }

  const queryClient = getQueryClient();

  try {
    const data = await queryClient.fetchQuery({
      queryKey: ["front-of-my-turn"],
      queryFn: () => getTeamsFrontOfMe({ storeId, accessKey }),
    });

    if (data?.state === "CANCEL") {
      redirect(`/waitings/result?type=cancel&storeId=${storeId}`);
    } else if (data?.state === "COMPLETE") {
      redirect(`/waitings/result?type=enter&storeId=${storeId}`);
    }

    return (
      <Suspense fallback={<Spinner />}>
        <MyTurnPage storeId={storeId} publicAccessKey={accessKey} />
      </Suspense>
    );
  } catch (error: any) {
    if (error?.response?.data?.code === "WAITING_NOT_FOUND") {
      redirect(`/waitings/result?type=error&storeId=${storeId}`);
    }
    throw error;
  }
}
