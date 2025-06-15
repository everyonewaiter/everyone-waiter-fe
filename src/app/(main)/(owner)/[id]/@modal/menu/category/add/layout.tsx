import { PropsWithChildren } from "react";
import getQueryClient from "@/app/get-query-client";
import { getDevices } from "@/lib/api/device.api";
import RefLayout from "../../../_components/RefLayout";

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

  return <RefLayout className="md:w-[340px]">{children}</RefLayout>;
}
