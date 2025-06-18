"use client";

import { useState } from "react";
import { useParams, useSearchParams } from "next/navigation";
import DetailMenuModal from "../_components/DetailMenuModal";

export default function Page() {
  const params = useParams();
  const searchParams = useSearchParams();
  const menuId = params?.menuId;
  const categoryId = searchParams.get("categoryId");

  const [isEditing, setIsEditing] = useState(false);

  return (
    <DetailMenuModal
      isEditing={isEditing}
      onSetEditing={setIsEditing}
      type="update"
      menuId={menuId as string}
      categoryId={categoryId as string}
    />
  );
}
