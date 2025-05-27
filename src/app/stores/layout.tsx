import PageTitle from "@/app/(main)/_components/PageTitle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="h-screen w-screen bg-gray-700 lg:px-[60px] lg:py-[32px]">
      <div className="h-full w-full rounded-[32px] bg-white lg:px-8">
        <PageTitle title="매장 등록 신청 현황" />
        {children}
      </div>
    </div>
  );
}
