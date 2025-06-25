/* eslint-disable react-hooks/rules-of-hooks */
import {
  deleteDevice,
  getDetailDevice,
  getDevices,
  updateDevice,
} from "@/app/(device-required)/device/_api/device.api";
import { useMutation, useQuery } from "@tanstack/react-query";
import getQueryClient from "@/app/get-query-client";
import { deviceKeys } from "./keys";

const useDevice = () => {
  const queryClient = getQueryClient();

  const deviceQuery = (storeId: string) =>
    useQuery({
      queryKey: deviceKeys.all(storeId),
      queryFn: () => getDevices(storeId),
      enabled: !!storeId,
    });

  const detailQuery = (deviceId: string, storeId: string) =>
    useQuery({
      queryKey: deviceKeys.detail(storeId, deviceId),
      queryFn: () => getDetailDevice({ storeId, deviceId }),
      enabled: !!storeId && !!deviceId,
    });

  const update = useMutation({
    mutationFn: updateDevice,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: deviceKeys.all(variables.storeId),
      });
    },
  });

  const remove = useMutation({
    mutationFn: deleteDevice,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: deviceKeys.all(variables.storeId),
      });
    },
  });

  return {
    deviceQuery,
    detailQuery,
    update,
    remove,
  };
};

export default useDevice;
