import DetailMenuModal from "../../@modal/menu/_components/DetailMenuModal";
import MenuList from "../_components/MenuList";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ hideModal: string; categoryId: string }>;
}) {
  const { hideModal, categoryId } = await searchParams;

  if (hideModal === "true")
    return (
      <DetailMenuModal isEditing type="create" initialCategoryId={categoryId} />
    );

  return <MenuList />;
}
