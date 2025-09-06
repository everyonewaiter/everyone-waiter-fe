import { Metadata } from "next";
import { Suspense } from "react";
import Spinner from "@/components/common/Spinner";
import { redirect } from "next/navigation";
import getQueryClient from "@/app/get-query-client";
import { getTeamsFrontOfMe } from "../../_api/public.api";
import CancelTurnPage from "../_components/_templates/CancelTurnPage";

export const metadata: Metadata = {
  title: "내 순서 취소하기",
  description: "내 웨이팅 순서를 취소할 수 있다.",
  icons: {
    icon: "/logo/logo.svg",
  },
};

/**
 *
 * @param param0 - 웨이팅 취소할 매장 ID
 * @param param1 - 웨이팅 접근 가능한 토큰
 * @param param2 - 인증 번호
 */
export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ storeId: string; accessKey: string; phone: string }>;
}) {
  const params = await searchParams;

  if (!params.accessKey) {
    throw new Error("필수 파라미터가 누락되었습니다.");
  }

  const queryClient = getQueryClient();

  try {
    const data = await queryClient.fetchQuery({
      queryKey: ["front-of-my-turn"],
      queryFn: () =>
        getTeamsFrontOfMe({
          storeId: params.storeId,
          accessKey: params.accessKey,
        }),
    });

    if (data?.state === "CANCEL") {
      redirect(`/waitings/result?type=cancel&storeId=${params.storeId}`);
    } else if (data?.state === "COMPLETE") {
      redirect(`/waitings/result?type=enter&storeId=${params.storeId}`);
    }

    return (
      <Suspense fallback={<Spinner />}>
        <CancelTurnPage {...params} />
      </Suspense>
    );
  } catch (error: any) {
    if (error?.response?.data?.code === "WAITING_NOT_FOUND") {
      redirect(`/waitings/result?type=error&storeId=${params.storeId}`);
    }
    throw error;
  }
}
