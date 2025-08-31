import { Suspense } from "react";
import { Skeleton } from "@/components/common/Skeleton/Skeleton";
import UserDetailPage from "../../../_components/_templates/UserDetailPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex !h-[300px] flex-col gap-3.5 md:!h-[360px] lg:!h-[450px]">
          <Skeleton.FieldGroup total={1} />
        </div>
      }
    >
      <UserDetailPage />
    </Suspense>
  );
}
