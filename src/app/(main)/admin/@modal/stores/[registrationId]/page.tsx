import { Suspense } from "react";
import { Skeleton } from "@/components/common/Skeleton/Skeleton";
import StoreDetailPage from "../../../_components/_templates/StoreDetailPage";

export default function Page() {
  return (
    <Suspense
      fallback={
        <div className="flex h-[288px] flex-col gap-3.5 md:h-[324px] lg:h-[488px]">
          <Skeleton.FieldGroup total={4} />
        </div>
      }
    >
      <div className="shrink-0">
        <StoreDetailPage />
      </div>
    </Suspense>
  );
}
