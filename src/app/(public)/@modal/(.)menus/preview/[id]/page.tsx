import { getMenuPreview } from "@/app/(public)/_api/public.api";
import getQueryClient from "@/app/get-query-client";
import dynamic from "next/dynamic";

const MenuModal = dynamic(
  () => import("@/app/(device-required)/pos/_components/modals/MenuModal"),
  {
    ssr: true,
  }
);

export default async function Page({
  searchParams,
  params,
}: {
  params: Promise<{ id: string | string[] }>;
  searchParams: Promise<{ storeId: string; categoryId: string }>;
}) {
  const { id } = await params;
  const { storeId, categoryId } = await searchParams;

  const queryClient = getQueryClient();

  const data = await queryClient.fetchQuery({
    queryKey: ["menu-list", storeId],
    queryFn: () => getMenuPreview(storeId!),
  });
  const menu = data?.categories
    .flatMap((el) => el.menus)
    .find(
      (el) =>
        el.categoryId === categoryId &&
        el.menuId === (Array.isArray(id) ? id[0] : id)
    );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <MenuModal
        data={menu as MenuDetail}
        type="preview"
        layoutClassName="!w-[320px]  md:!w-[664px]  lg:!w-[1148px] h-fit pb-6"
      />
    </div>
  );
}
