"use client";

import { useParams } from "next/navigation";
import { useState } from "react";
import dynamic from "next/dynamic";
import Spinner from "@/components/common/Spinner";
import { menuQueries } from "../../../../../menu/_queries/useMenu";

const DetailMenuModal = dynamic(
  () => import("../../../_components/DetailMenuModal/index"),
  { ssr: false }
);

export default function Page() {
  const params = useParams();

  const storeId = params?.id as string;
  const menuId = params?.menuId as string;
  const categoryId = params?.categoryId as string;

  const { data, isLoading, refetch } = menuQueries.useMenuDetail(
    storeId,
    categoryId ?? "",
    menuId
  );

  const [isEditing, setIsEditing] = useState(false);

  if (isLoading || !categoryId)
    return (
      <div className="center h-full w-full">
        <Spinner />
      </div>
    );

  return (
    <DetailMenuModal
      isEditing={isEditing}
      onSetEditing={(value) => {
        if (value) {
          setIsEditing(true);
        } else {
          setIsEditing(false);
          refetch();
        }
      }}
      type="update"
      data={data}
    />
  );
}
