import { Suspense } from "react";
import ErrorMailClient from "../_components/ErrorMailClient";

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <ErrorMailClient />
    </Suspense>
  );
}
