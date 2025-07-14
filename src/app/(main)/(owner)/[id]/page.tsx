import StoreList from "@/app/(main)/stores/page";

export const metadata = {
  title: "모두의 웨이터 - 매장 등록 신청 현황",
  description: "요청된 매장 등록 현황을 확인하는 페이지입니다.",
};

export default function Page() {
  return (
    <div className="h-full">
      <StoreList />
    </div>
  );
}
