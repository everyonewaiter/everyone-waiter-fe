"use client";

import { useParams } from "next/navigation";
import DetailMenuModal from "../_components/DetailMenuModal";

export default function Page() {
  const params = useParams();

  return (
    <DetailMenuModal
      isEditing
      onSetEditing={() => null}
      storeId={params?.id as string}
    />
  );
}
