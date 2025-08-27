import MenuPreview from "../_components/_template/MenuPreview";

export default async function Page({
  searchParams,
}: {
  searchParams: Promise<{ storeId: string }>;
}) {
  const { storeId } = await searchParams;

  return <MenuPreview storeId={storeId} />;
}
