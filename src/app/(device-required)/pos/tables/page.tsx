"use client";

import dynamic from "next/dynamic";
import { Suspense } from "react";
import { useDeviceContext } from "@/providers/deviceStoreProvider";
import { redirect } from "next/navigation";
import usePos from "../_queries/usePos";

const PosTables = dynamic(() => import("../_components/template/PosTables"));

export default function Page() {
  const { storeId } = useDeviceContext();

  const { storeInfo } = usePos();
  const { data } = storeInfo(storeId!);

  if (data?.status === "CLOSE") redirect("/pos");

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <PosTables />
    </Suspense>
  );
}
