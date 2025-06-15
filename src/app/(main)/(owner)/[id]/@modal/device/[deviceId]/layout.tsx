import { PropsWithChildren } from "react";
import getQueryClient from "@/app/get-query-client";
import { getDevices } from "@/lib/api/device.api";
import ModalButton from "../../_components/ModalButton";
import ModalTitle from "../../_components/ModalTitle";
import RefLayout from "../../_components/RefLayout";

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{ params: Promise<{ id: string; deviceId: string }> }>) {
  const queryClient = getQueryClient();
  const { id, deviceId } = await params;

  await queryClient.prefetchQuery({
    queryKey: ["get-device-detail", id, deviceId],
    queryFn: () => getDevices(id),
  });

  return (
    <RefLayout>
      <ModalTitle title="기기 정보" />
      {children}
      <ModalButton buttonText="확인" />
    </RefLayout>
  );
}
