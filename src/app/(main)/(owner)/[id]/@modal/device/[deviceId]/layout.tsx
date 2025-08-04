import { PropsWithChildren } from "react";
import { getDevices } from "@/app/(main)/(owner)/[id]/device/_api/device.api";
import getQueryClient from "@/app/get-query-client";
import RefLayout from "@/components/modal/RefLayout";
import { deviceKeys } from "../../../device/_queries/keys";
import ModalTitle from "../../_components/ModalTitle";

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ id: string; deviceId: string }> }>) {
  const queryClient = getQueryClient();
  const { id, deviceId } = await params;

  await queryClient.prefetchQuery({
    queryKey: deviceKeys.detail(id, deviceId),
    queryFn: () => getDevices(id),
  });

  return (
    <RefLayout className="min-w-[544px]">
      <ModalTitle title="기기 정보" />
      {children}
    </RefLayout>
  );
}
