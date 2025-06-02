import PageTitle from "@/app/(main)/_components/PageTitle";

export default async function Layout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <PageTitle title="설정" />
      <div className="h-full w-full overflow-y-auto">
        <div className="flex h-full w-full items-start justify-center py-6 md:items-center lg:py-10">
          {children}
        </div>
      </div>
    </>
  );
}
