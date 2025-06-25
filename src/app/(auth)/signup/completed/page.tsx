import { Suspense } from "react";
import SignupCompletedClient from "../_components/SignupCompletedClient";

export default function Page() {
  return (
    <Suspense fallback={<div>로딩 중...</div>}>
      <SignupCompletedClient />
    </Suspense>
  );
}
