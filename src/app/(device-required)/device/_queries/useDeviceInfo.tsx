import { useQuery } from "@tanstack/react-query";
import { getDeviceDetail } from "../_api/device.api";

export default function useDeviceInfo() {
  return useQuery({
    queryKey: ["get-device-info-with-store"],
    queryFn: getDeviceDetail,
  });
}
