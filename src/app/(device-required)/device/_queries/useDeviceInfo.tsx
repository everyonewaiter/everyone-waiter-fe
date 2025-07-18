import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addDevice,
  getDeviceDetail,
  sendAuthCodeInDevice,
  verifyPhoneInDevice,
} from "../_api/device.api";
import { deviceKeys } from "./keys";

const useDeviceDetail = () =>
  useQuery({
    queryKey: deviceKeys.detail,
    queryFn: getDeviceDetail,
  });

const useAddDevice = () =>
  useMutation({
    mutationFn: addDevice,
  });

const useVerifyPhone = () =>
  useMutation({
    mutationFn: verifyPhoneInDevice,
  });

const useSendAuth = () =>
  useMutation({
    mutationFn: sendAuthCodeInDevice,
  });

export const deviceQueries = {
  useDeviceDetail,
  useAddDevice,
  useVerifyPhone,
  useSendAuth,
};
