"use client";

import { useSearchParams } from "next/navigation";
import { PropsWithChildren } from "react";

export default function ClientModalWrapper({ children }: PropsWithChildren) {
  const searchParams = useSearchParams();
  const hideModal = searchParams.get("hideModal");

  if (hideModal === "true") return null;

  return children;
}
