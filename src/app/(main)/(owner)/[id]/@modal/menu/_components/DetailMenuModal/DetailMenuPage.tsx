"use client";

import { useState } from "react";
import Spinner from "@/components/common/Spinner";
import DetailMenuModal from ".";
import { menuQueries } from "../../../../menu/_queries/useMenu";

interface IProps {
  storeId: string;
  categoryId: string;
  menuId: string;
}

export default function DetailMenuPage({ ...props }: IProps) {
  const { storeId, categoryId, menuId } = props;

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
