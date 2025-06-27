"use client";

import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import { useStoreContext } from "@/providers/storeProvider";
import DetailMenuModal from "../_components/DetailMenuModal";
import useMenu from "../../../menu/_queries/useMenu";

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
