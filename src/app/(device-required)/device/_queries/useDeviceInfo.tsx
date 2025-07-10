import { useMutation, useQuery } from "@tanstack/react-query";
import { addDevice, getDeviceDetail } from "../_api/device.api";

export default function useDeviceInfo() {
  const detail = () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: ["get-device-info-with-store"],
      queryFn: getDeviceDetail,
    });

  const add = () =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useMutation({
      mutationFn: addDevice,
    });

  return {
    detail,
    add,
  };
}
