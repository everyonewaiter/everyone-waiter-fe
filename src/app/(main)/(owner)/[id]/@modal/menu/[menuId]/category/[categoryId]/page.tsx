import ClientRefWrapper from "../../../_components/Wrapper";
import DetailMenuPage from "../../../_components/DetailMenuModal/DetailMenuPage";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Promise<{ hideModal: string }>;
  params: Promise<{ id: string; menuId: string; categoryId: string }>;
}) {
  const p = await params;

  const { hideModal } = await searchParams;

  if (hideModal === "true") {
    return null;
  }

  return (
    <ClientRefWrapper className="aspect-[1344/832] md:h-auto md:w-[1000px] lg:h-[832px] lg:w-[1344px]">
      <DetailMenuPage {...p} storeId={p?.id} />
    </ClientRefWrapper>
  );
}
