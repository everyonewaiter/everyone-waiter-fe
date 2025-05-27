import PageTitle from "@/app/(main)/_components/PageTitle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageTitle title="매장 등록 신청 현황" />
      {children}
    </>
  );
}
