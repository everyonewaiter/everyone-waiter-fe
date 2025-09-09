"use client";

import dynamic from "next/dynamic";
import { Suspense, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useDeviceContext } from "@/providers/deviceStoreProvider";
import { posQueries } from "../_queries/usePos";

const PosTables = dynamic(() => import("../_components/template/PosTables"));

export default function Page() {
  const navigate = useRouter();
  const { storeId } = useDeviceContext();

  const { data } = posQueries.useStoreInfo(storeId!);

  useEffect(() => {
    if (data?.status === "CLOSE") {
      navigate.replace("/pos");
    }
  }, [data?.status]);

  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <PosTables />
    </Suspense>
  );
}
