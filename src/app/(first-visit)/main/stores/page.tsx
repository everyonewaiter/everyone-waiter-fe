import MobileHeader from "@/app/(main)/_components/MobileLayout/MobileHeader";
import PageTitle from "@/app/(main)/_components/PageTitle/PageTitle";
import StoreList from "@/app/(main)/stores/_components/_templates/StoreList";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ id: string }>;
}) {
  const { id } = await searchParams;

  return (
    <>
      <MobileHeader href="/main" storeId={id} />
      <div className="h-full w-full md:px-6 md:py-4 lg:px-15 lg:py-8">
        <div className="h-auto w-full bg-white p-5 md:h-full md:rounded-[32px] md:p-6 lg:p-8">
          <PageTitle storeId={id} initialTitle="매장 정보" />
          <StoreList storeId={id} />
        </div>
      </div>
    </>
  );
}
