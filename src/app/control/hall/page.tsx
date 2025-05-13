"use client";

import useDeviceId from "@/hooks/store/useDeviceId";

export default function Hall() {
  const { deviceId } = useDeviceId();
  return <div>Hall {deviceId}</div>;
}
