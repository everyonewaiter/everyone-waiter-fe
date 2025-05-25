"use client";

import { useSearchParams } from "next/navigation";
import GuideComponent from "@/components/GuideComponent";
import CreateForm from "../_components/CreateForm";

export default function CreateStore() {
  const searchParams = useSearchParams();
  const state = searchParams.get("state");

  switch (state) {
    case "pending":
      return (
        <div className="center h-full w-full">
          <GuideComponent
            title="매장 등록 승인을 기다리고 있습니다."
            subtitle="관리자의 승인이 완료될 때까지 1~2일 소요될\n예정이니 양해 부탁드립니다."
            image={{ url: "/gif/hourglass.gif", size: 160 }}
            gap={5}
          />
        </div>
      );
    case "rejected":
      return (
        <div className="center h-full w-full">
          <GuideComponent
            title="매장 등록 신청이 반려되었습니다."
            subtitle="반려 사유 관련 메일을 발송했습니다.\n메일함을 확인해주세요."
            image={{ url: "/gif/rejected.gif", size: 160 }}
            gap={5}
          />
        </div>
      );
    default:
      return (
        <div className="flex w-full items-center justify-center md:items-start lg:items-center">
          <CreateForm />
        </div>
      );
  }
}
