"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useAccount } from "@/hooks/store/useAccount";
import GuideComponent from "@/components/GuideComponent";
import useStores from "@/hooks/useStores";
import ClientLayout from "@/components/layout/ClientLayout";

export default function Home() {
  const { permission } = useAccount();
  const { registrationListQuery } = useStores();
  const { data, isLoading: isListLoading } = registrationListQuery(1);

  return (
    <ClientLayout>
      <div className="center h-full w-full">
        {permission !== "ADMIN" && !isListLoading && !data?.content?.length && (
          <GuideComponent
            title="매장이 등록되어 있지 않아요.\n아래 버튼을 눌러 매장 등록 신청을 해주세요."
            subtitle="매장 등록을 신청하시면 관리자가 확인 후 승인해드려요.\n1~2일 이내에 매장 승인이 완료됩니다."
            image={{ url: "/gif/no-stores.gif", size: 160 }}
            isFromHome
          />
        )}
        {permission !== "ADMIN" &&
          !isListLoading &&
          data?.content?.length! > 0 &&
          data?.content?.[0].status === "APPLY" && (
            <GuideComponent
              title="매장 등록 승인을 기다리고 있습니다."
              subtitle="관리자의 승인이 완료될 때까지 1~2일 소요될\n예정이니 양해 부탁드립니다."
              image={{ url: "/gif/hourglass.gif", size: 160 }}
              gap={5}
            />
          )}
      </div>
    </ClientLayout>
  );
}
