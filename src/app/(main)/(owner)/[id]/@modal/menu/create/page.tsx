import DetailMenuModal from "../_components/DetailMenuModal";
import ClientRefWrapper from "../_components/Wrapper";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ hideModal: string; categoryId: string }>;
}) {
  const { hideModal, categoryId } = await searchParams;

  if (hideModal === "true") return null;

  return (
    <ClientRefWrapper className="aspect-[1344/832] md:h-auto md:min-w-[930px] lg:h-[832px] lg:w-[1344px]">
      <DetailMenuModal isEditing type="create" initialCategoryId={categoryId} />
    </ClientRefWrapper>
  );
}
