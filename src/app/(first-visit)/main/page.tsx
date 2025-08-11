"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { storesQueries } from "@/app/(main)/(owner)/[id]/store/_queries/useStores";
import GuideComponent from "@/components/GuideComponent";
import Loading from "@/components/Loading";
import useAuthStore from "@/stores/useAuthStore";
import MainLayout from "./_components/MainLayout";

export default function Page() {
  const navigate = useRouter();
  const {
    data: registerData,
    isLoading,
    isError,
  } = storesQueries.useRegistrationList();

  const { firstStoreId } = useAuthStore();

  if (firstStoreId) {
    navigate.push("/main/stores");
  }

  useEffect(() => {
    if (!isLoading && (registerData?.count ?? 0) > 1) {
      navigate.replace("/");
    }
  }, [isLoading, registerData?.count, navigate]);

  if (isLoading) {
    return (
      <div className="center h-full w-full">
        <Loading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="center h-full w-full">
        <GuideComponent
          title="데이터를 불러오지 못했어요."
          subtitle="잠시 후 다시 시도해주세요."
          image={{ url: "/gif/rejected.gif", size: 160 }}
          href="/stores"
        />
      </div>
    );
  }

  const count = registerData?.count ?? 0;
  const firstStatus = registerData?.content?.[0]?.status;

  return (
    <MainLayout>
      <div className="center h-full w-full">
        {!isLoading && count === 0 && (
          <GuideComponent
            title="매장이 등록되어 있지 않아요.\n아래 버튼을 눌러 매장 등록 신청을 해주세요."
            subtitle="매장 등록을 신청하시면 관리자가 확인 후 승인해드려요.\n1~2일 이내에 매장 승인이 완료됩니다."
            image={{ url: "/gif/no-stores.gif", size: 160 }}
            href="/main/create"
          />
        )}
        {!isLoading && firstStatus === "APPLY" && (
          <GuideComponent
            title="매장 등록 승인을 기다리고 있습니다."
            subtitle="관리자의 승인이 완료될 때까지 1~2일 소요될\n예정이니 양해 부탁드립니다."
            image={{ url: "/gif/hourglass.gif", size: 160 }}
            gap="gap-[5px]"
            href="/main/stores"
            buttonText="내 신청 현황 보러가기"
          />
        )}
        {!isLoading && firstStatus === "REJECT" && (
          <GuideComponent
            title="매장 등록 신청이 반려되었습니다."
            subtitle="반려 사유 관련 메일을 발송했습니다.\n메일함을 확인해주세요."
            image={{ url: "/gif/rejected.gif", size: 160 }}
            gap="gap-[5px]"
            href="/main/stores"
            buttonText="내 신청 현황 보러가기"
          />
        )}
      </div>
    </MainLayout>
  );
}
