import PageTitle from "@/app/(main)/_components/PageTitle";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <PageTitle title="매장 정보" />
      {children}
    </>
  );
}
