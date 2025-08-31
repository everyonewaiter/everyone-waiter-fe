import React, { Suspense } from "react";
import { getDevices } from "@/app/(main)/(owner)/[id]/device/_api/device.api";
import getQueryClient from "@/app/get-query-client";
import RefLayout from "@/components/modal/RefLayout";
import { Skeleton } from "@/components/common/Skeleton/Skeleton";
import { deviceKeys } from "../../../device/_queries/keys";
import ModalTitle from "../../_components/ModalTitle";
import DetailDevicePage from "../../_components/_templates/DetailDevicePage";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string; deviceId: string }>;
}) {
  const queryClient = getQueryClient();
  const { id, deviceId } = await params;

  await queryClient.prefetchQuery({
    queryKey: deviceKeys.detail(id, deviceId),
    queryFn: () => getDevices(id),
  });

  return (
    <RefLayout className="w-[calc(100%-60px)] min-w-[320px] md:w-auto md:min-w-[544px]">
      <ModalTitle title="기기 정보" />
      <Suspense
        fallback={
          <div className="flex flex-col gap-3.5 md:h-[324px] lg:h-[488px]">
            <Skeleton.FieldGroup total={4} />
          </div>
        }
      >
        <DetailDevicePage storeId={id} deviceId={deviceId} />
      </Suspense>
    </RefLayout>
  );
}
