import DetailMenuPage from "../../../../@modal/menu/_components/DetailMenuModal/DetailMenuPage";
import MenuList from "../../../_components/MenuList";

export default async function Page({
  searchParams,
  params,
}: {
  searchParams: Promise<{ hideModal: string }>;
  params: Promise<{ id: string; menuId: string; categoryId: string }>;
}) {
  const { hideModal } = await searchParams;
  const p = await params;

  if (hideModal === "true")
    return (
      <DetailMenuPage
        storeId={p?.id}
        categoryId={p?.categoryId}
        menuId={p?.menuId}
      />
    );
  return <MenuList />;
}
