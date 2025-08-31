import PageTitle from "@/app/(main)/_components/PageTitle/PageTitle";
import PAGE_TITLES from "@/constants/pageTitles";
import MenuList from "../../_components/MenuList";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  return (
    <>
      <PageTitle initialTitle={PAGE_TITLES.OWNER.menu} storeId={id} />
      <div className="relative flex h-full w-full flex-col">
        <MenuList />
      </div>
    </>
  );
}
