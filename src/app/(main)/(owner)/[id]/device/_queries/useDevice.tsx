import { useMutation, useQuery } from "@tanstack/react-query";
import getQueryClient from "@/app/get-query-client";
import {
  deleteDevice,
  getDetailDevice,
  getDevices,
  updateDevice,
} from "../_api/device.api";
import { deviceKeys } from "./keys";

const queryClient = getQueryClient();

const useDevices = (storeId: string) =>
  useQuery({
    queryKey: deviceKeys.all(storeId),
    queryFn: () => getDevices(storeId),
    enabled: !!storeId,
    staleTime: 1000 * 60 * 5,
  });

const useDetails = (deviceId: string, storeId: string) =>
  useQuery({
    queryKey: deviceKeys.detail(storeId, deviceId),
    queryFn: () => getDetailDevice({ storeId, deviceId }),
    enabled: !!storeId && !!deviceId,
    staleTime: 1000 * 60 * 5,
  });

const useUpdateDevice = () =>
  useMutation({
    mutationFn: updateDevice,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: deviceKeys.all(variables.storeId),
      });
      queryClient.invalidateQueries({
        queryKey: deviceKeys.detail(variables.storeId, variables.deviceId),
      });
    },
  });

const useRemoveDevice = () =>
  useMutation({
    mutationFn: deleteDevice,
    onSuccess: (_, variables) => {
      queryClient.invalidateQueries({
        queryKey: deviceKeys.all(variables.storeId),
      });
    },
  });

export const deviceQueries = {
  useDetails,
  useDevices,
  useRemoveDevice,
  useUpdateDevice,
};
