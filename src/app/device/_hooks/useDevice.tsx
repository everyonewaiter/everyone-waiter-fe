import useStoreId from "@/hooks/store/useStoreId";
import {
  deleteDevice,
  getDetailDevice,
  getDevices,
  updateDevice,
} from "@/lib/api/device.api";
import { useMutation, useQuery } from "@tanstack/react-query";

const useDevice = () => {
  const { storeId } = useStoreId();

  const getDevicesQuery = useQuery({
    queryKey: ["get-devices", storeId.toString()],
    queryFn: () => getDevices({ storeId }),
    enabled: !!storeId,
  });

  const useGetDeviceDetailQuery = (deviceId: bigint) =>
    useQuery({
      queryKey: ["get-device-detail", deviceId.toString()],
      queryFn: () => getDetailDevice({ storeId, deviceId }),
      enabled: !!storeId && !!deviceId,
    });

  const mutateUpdateDevice = useMutation({
    mutationFn: updateDevice,
  });

  const mutateDeleteDevice = useMutation({
    mutationFn: deleteDevice,
  });

  return {
    getDevicesQuery,
    useGetDeviceDetailQuery,
    mutateUpdateDevice,
    mutateDeleteDevice,
  };
};

export default useDevice;
