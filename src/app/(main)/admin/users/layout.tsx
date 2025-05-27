import PageTitle from "@/app/(main)/_components/PageTitle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageTitle title="회원 관리" />
      {children}
    </>
  );
}
