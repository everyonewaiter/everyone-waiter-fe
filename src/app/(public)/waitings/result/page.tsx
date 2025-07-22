"use client";

import { useSearchParams } from "next/navigation";
import NotFound from "@/app/not-found";
import PublicStateComponent from "../_components/PublicStateComponent";

export default function Page() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  if (!type) return <NotFound />;

  if (type === "success") {
    return (
      <PublicStateComponent
        {...{
          gifName: "success",
          title: "웨이팅 등록이 취소되었습니다!",
          buttonType: "agree",
        }}
      />
    );
  }

  if (type === "cancel") {
    return (
      <PublicStateComponent
        {...{
          gifName: "cancel",
          title: `예약이 취소되어 순번을\n확인할 수 없습니다.`,
          subtitle: `아래 버튼을 클릭하면 새로운 웨이팅을\n등록할 수 있습니다.`,
          buttonType: "go-back",
        }}
      />
    );
  }

  if (type === "enter") {
    return (
      <PublicStateComponent
        {...{
          gifName: "success",
          title: "이미 입장 완료되었습니다!",
          subtitle: `순번이 호출되어 매장에 입장하셨습니다.\n더 이상 웨이팅 정보를 확인할 수 없습니다.`,
          buttonType: "see-menu",
        }}
      />
    );
  }

  if (type === "error") {
    return (
      <PublicStateComponent
        {...{
          gifName: "error",
          title: "정보를 불러올 수 없습니다.",
          subtitle: "일시적인 오류가 발생했습니다. 다시 시도해 주세요.",
          buttonType: "retry",
        }}
      />
    );
  }
}
