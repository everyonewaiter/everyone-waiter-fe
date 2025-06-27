"use client";

import DetailMenuModal from "../_components/DetailMenuModal";

export default function Page() {
  return (
    <DetailMenuModal
      data={{} as MenuDetail}
      isEditing
      onSetEditing={() => null}
      type="create"
    />
  );
}
