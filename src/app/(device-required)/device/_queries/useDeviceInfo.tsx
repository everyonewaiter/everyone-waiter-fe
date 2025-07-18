import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addDevice,
  getDeviceDetail,
  sendAuthCodeInDevice,
  verifyPhoneInDevice,
} from "../_api/device.api";

const useDeviceDetail = () =>
  useQuery({
    queryKey: ["get-device-info-with-store"],
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
