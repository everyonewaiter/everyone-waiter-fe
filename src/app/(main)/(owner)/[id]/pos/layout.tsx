import PageTitle from "@/app/(main)/_components/PageTitle";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageTitle title="POS" />
      {children}
    </>
  );
}
