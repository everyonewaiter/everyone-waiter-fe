import { PropsWithChildren } from "react";
import getQueryClient from "@/app/get-query-client";
import { getDevices } from "@/app/(device-required)/device/_api/device.api";
import RefLayout from "@/components/modal/RefLayout";
import ModalButton from "../../_components/ModalButton";
import ModalTitle from "../../_components/ModalTitle";
import { deviceKeys } from "../../../device/_queries/keys";

export default async function Layout({
  children,
  params,
}: PropsWithChildren<{ params: { id: string; deviceId: string } }>) {
  const queryClient = getQueryClient();
  const { id, deviceId } = params;

  await queryClient.prefetchQuery({
    queryKey: deviceKeys.detail(id, deviceId),
    queryFn: () => getDevices(id),
  });

  return (
    <RefLayout className="min-w-[544px]">
      <ModalTitle title="기기 정보" />
      {children}
      <ModalButton buttonText="확인" />
    </RefLayout>
  );
}
