"use client";

import { useSearchParams } from "next/navigation";
import NotFound from "../_components/NotFound";
import AlreadyEntered from "../_components/AlreadyEntered";
import AlreadyCancelled from "../_components/AlreadyCancelled";
import SuccessfullyCancelled from "../_components/SuccessfullyCancelled";

export default function Page() {
  const searchParams = useSearchParams();
  const type = searchParams.get("type");

  if (!type || type === "error") return <NotFound />;
  if (type === "entered") return <AlreadyEntered />;
  if (type === "cancelled") return <AlreadyCancelled />;
  if (type === "success") return <SuccessfullyCancelled />;
  return null;
}
