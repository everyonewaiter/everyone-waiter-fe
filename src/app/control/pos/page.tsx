"use client";

import useDeviceId from "@/hooks/store/useDeviceId";

export default function Pos() {
  const { deviceId } = useDeviceId();
  return <div>Pos {deviceId}</div>;
}
