import dynamic from "next/dynamic";
import { Suspense } from "react";

const PosTables = dynamic(() => import("../_components/template/PosTables"));

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <PosTables />
    </Suspense>
  );
}
