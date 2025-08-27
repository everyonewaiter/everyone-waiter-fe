import { Metadata } from "next";
import NotFound from "@/app/not-found";
import PublicStateComponent from "../_components/PublicStateComponent";

export const metadata: Metadata = {
  title: "웨이팅 결과",
  description: "웨이팅 상태를 확인할 수 있습니다.",
};

interface PageProps {
  searchParams: Promise<{ type?: string }>;
}

export default async function Page({ searchParams }: PageProps) {
  const { type } = await searchParams;

  if (!type) return <NotFound />;

  switch (type) {
    case "success":
      return (
        <PublicStateComponent
          {...{
            gifName: "success",
            title: "웨이팅 등록이 취소되었습니다!",
            buttonType: "agree",
          }}
        />
      );

    case "cancel":
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

    case "enter":
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

    case "error":
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

    default:
      return <NotFound />;
  }
}
