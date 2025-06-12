"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import useAuthStore from "@/stores/useAuthStore";
import GuideComponent from "@/components/GuideComponent";
import useStores from "./(main)/(owner)/[id]/store/_hooks/useStores";

export default function Home() {
  const { user } = useAuthStore();
  const router = useRouter();

  const { acceptedStoresListQuery, registrationListQuery } = useStores();
  const { data, isLoading } = acceptedStoresListQuery(true);
  const { data: registerData } = registrationListQuery();
  const firstStoreId = data?.stores?.[0].storeId;

  useEffect(() => {
    if (!isLoading && firstStoreId) {
      router.push(`/${firstStoreId}`);
    }
  }, [isLoading, firstStoreId, router]);

  if (isLoading) return null;

  return (
    <div>
      {user?.permission !== "ADMIN" && !firstStoreId && (
        <div className="center h-full w-full">
          {!isLoading && (
            <GuideComponent
              title="매장이 등록되어 있지 않아요.\n아래 버튼을 눌러 매장 등록 신청을 해주세요."
              subtitle="매장 등록을 신청하시면 관리자가 확인 후 승인해드려요.\n1~2일 이내에 매장 승인이 완료됩니다."
              image={{ url: "/gif/no-stores.gif", size: 160 }}
              href="/create"
            />
          )}
          {!isLoading && registerData?.content?.[0].status === "APPLY" && (
            <GuideComponent
              title="매장 등록 승인을 기다리고 있습니다."
              subtitle="관리자의 승인이 완료될 때까지 1~2일 소요될\n예정이니 양해 부탁드립니다."
              image={{ url: "/gif/hourglass.gif", size: 160 }}
              gap={5}
              href="/stores"
            />
          )}
          {!isLoading && registerData?.content?.[0].status === "REJECT" && (
            <GuideComponent
              title="매장 등록 신청이 반려되었습니다."
              subtitle="반려 사유 관련 메일을 발송했습니다.\n메일함을 확인해주세요."
              image={{ url: "/gif/rejected.gif", size: 160 }}
              gap={5}
              href="/stores"
            />
          )}
        </div>
      )}
    </div>
  );
}
