import StoreList from "@/app/(main)/stores/page";
import PageTitle from "../../_components/PageTitle";

export default function Page() {
  return (
    <>
      <PageTitle title="매장 등록 신청 현황" />
      <StoreList />
    </>
  );
}
