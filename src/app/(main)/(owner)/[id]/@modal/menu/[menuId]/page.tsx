"use client";

import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";
import { useStoreContext } from "@/providers/storeProvider";
import useMenu from "../../../menu/_queries/useMenu";

const DetailMenuModal = dynamic(
  () => import("../_components/DetailMenuModal"),
  {
    ssr: false,
  }
);

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();
  const menuId = params?.menuId as string;
  const categoryId = searchParams.get("categoryId") as string;

  const { storeId } = useStoreContext();
  const { detailQuery } = useMenu(storeId);
  const { data } = detailQuery(categoryId, menuId, !!categoryId && !!menuId);

  const [isEditing, setIsEditing] = useState(false);

  return (
    <DetailMenuModal
      isEditing={isEditing}
      onSetEditing={setIsEditing}
      type="update"
      data={data!}
    />
  );
}
