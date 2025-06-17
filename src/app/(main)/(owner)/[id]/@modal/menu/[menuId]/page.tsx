"use client";

import { useState } from "react";
import DetailMenuModal from "../_components/DetailMenuModal";

export default function Page() {
  const [isEditing, setIsEditing] = useState(false);

  return <DetailMenuModal isEditing={isEditing} onSetEditing={setIsEditing} />;
}
