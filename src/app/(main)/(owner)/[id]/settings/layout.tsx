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
        <div className="mt-6 flex w-full items-start justify-center md:items-center lg:mt-10 lg:h-full">
          {children}
        </div>
      </div>
    </>
  );
}
