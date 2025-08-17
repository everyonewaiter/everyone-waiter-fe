import { ReactNode } from "react";
import getQueryClient from "@/app/get-query-client";
import { menuKeys } from "@/app/(main)/(owner)/[id]/menu/_queries/keys";
import { getMenuDetail } from "@/app/(main)/(owner)/[id]/menu/_api/menu.api";
import ClientRefWrapper from "../../../_components/Wrapper";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string; menuId: string; categoryId: string }>;
}) {
  const { id: storeId, menuId, categoryId } = await params;

  const queryClient = getQueryClient();

  await queryClient.fetchQuery({
    queryKey: menuKeys.menuInCategory(storeId, categoryId, menuId),
    queryFn: () => getMenuDetail({ storeId, categoryId, menuId }),
  });

  const menuData = queryClient.getQueryData<MenuDetail>(
    menuKeys.menuInCategory(storeId, categoryId, menuId)
  );

  return {
    title: `${menuData?.name}` || "Menu",
    description: "매장 정보를 확인하고 수정할 수 있는 페이지입니다.",
    icons: {
      icon: "/logo/logo.svg",
    },
  };
}

export default async function Layout({
  children,
  params,
}: {
  children: ReactNode;
  params: Promise<{ id: string; menuId: string; categoryId: string }>;
}) {
  const { id: storeId, menuId, categoryId } = await params;

  const queryClient = getQueryClient();

  await queryClient.fetchQuery({
    queryKey: menuKeys.menuInCategory(storeId, categoryId, menuId),
    queryFn: () => getMenuDetail({ storeId, categoryId, menuId }),
  });

  return (
    <ClientRefWrapper className="aspect-[1344/832] md:h-auto md:w-[1000px] lg:h-[832px] lg:w-[1344px]">
      {children}
    </ClientRefWrapper>
  );
}
