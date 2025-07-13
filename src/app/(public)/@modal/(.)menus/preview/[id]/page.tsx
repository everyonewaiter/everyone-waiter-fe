"use client";

import usePublic from "@/app/(public)/_queries/usePublic";
import dynamic from "next/dynamic";
import { useParams, useSearchParams } from "next/navigation";

const MenuModal = dynamic(
  () => import("@/app/(device-required)/pos/_components/modals/MenuModal"),
  {
    ssr: false,
  }
);

export default function Page() {
  const params = useParams();
  const menuId = params?.id;
  const searchParams = useSearchParams();
  const storeId = searchParams.get("storeId");
  const categoryId = searchParams.get("categoryId");

  const { menus } = usePublic(storeId!);
  const { data } = menus;
  const menu = data?.categories
    .flatMap((el) => el.menus)
    .find(
      (el) =>
        el.categoryId === categoryId &&
        el.menuId === (Array.isArray(menuId) ? menuId[0] : menuId)
    );

  // TODO: 원산지 표기 데이터 없음.

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
