import { useMutation, useQuery } from "@tanstack/react-query";
import axios, { AxiosError } from "axios";
import { UseFormReturn } from "react-hook-form";
import {
  addDevice,
  getDeviceDetail,
  sendAuthCodeInDevice,
  verifyPhoneInDevice,
} from "../_api/device.api";
import { deviceKeys } from "./keys";
import { TypeDeviceStep1Form } from "../_schema/device.schema";

const useDeviceDetail = (enabled = true) =>
  useQuery({
    queryKey: deviceKeys.detail,
    queryFn: getDeviceDetail,
    enabled,
  });

const useAddDevice = () =>
  useMutation({
    mutationFn: addDevice,
  });

interface IProps {
  form: UseFormReturn<TypeDeviceStep1Form>;
  onDispatch: (action: any) => void;
}

const useHandleDevice = ({ form, onDispatch }: IProps) => {
  const useVerifyPhone = (
    handleOpenAlert: () => void,
    successHandler: (data: any) => void
  ) =>
    useMutation({
      mutationFn: verifyPhoneInDevice,
      onMutate: () => onDispatch({ type: "CLICK_AUTH_CODE_BTN" }),
      onSuccess: (data) => {
        if (!data || !Array.isArray(data.stores) || data.stores.length === 0) {
          handleOpenAlert();
          form.reset();
          onDispatch({ type: "RESET" });
        } else {
          successHandler(data);
        }
      },
      onError: (error: any) => {
        if (!axios.isAxiosError(error)) {
          // eslint-disable-next-line
          alert("알 수 없는 오류가 발생했습니다.");
          return;
        }

        const axErr = error as AxiosError<any>;
        const code = (axErr?.response?.data as any)?.code as string | undefined;

        if (code === "ALREADY_VERIFIED_PHONE_NUMBER") {
          onDispatch({ type: "VERIFY_SUCCESS" });
          // eslint-disable-next-line
          alert("휴대폰 번호 인증이 이미 완료되었습니다.");
          return;
        }

        onDispatch({ type: "VERIFY_FAIL" });

        if (code === "EXPIRED_VERIFICATION_CODE") {
          form.setError("authNumber", {
            message: "유효하지 않은 인증 번호입니다.",
          });
          return;
        }

        if (code === "EXPIRED_VERIFICATION_PHONE_NUMBER") {
          form.setError("phone", {
            message: "휴대폰 인증 번호가 만료되었습니다.",
          });
          return;
        }

        form.setError("authNumber", {
          message: "문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
        });
      },
    });

  const useSendAuth = () =>
    useMutation({
      mutationFn: sendAuthCodeInDevice,
      onMutate: () => onDispatch({ type: "CLICK_PHONE_AUTH_BTN" }),
      onSuccess: () => onDispatch({ type: "AUTH_REQUEST_SUCCESS" }),
      onError: (error: any) => {
        if (!axios.isAxiosError(error)) {
          // eslint-disable-next-line
          alert("알 수 없는 오류가 발생했습니다.");
          return;
        }

        const axErr = error as AxiosError<any>;
        const code = (axErr?.response?.data as any)?.code as string | undefined;

        if (code === "EXCEED_MAXIMUM_VERIFICATION_PHONE_NUMBER") {
          onDispatch({ type: "EXCEEDED" });
          form.setError("phone", {
            message:
              "일일 인증 가능 횟수를 초과했습니다. 24시간 후 다시 시도해주세요.",
          });
          return;
        }

        if (code === "ALREADY_USE_PHONE_NUMBER") {
          onDispatch({ type: "RESET" });
          form.setError("phone", {
            message: "이미 사용중인 휴대폰 번호입니다.",
          });
          return;
        }

        onDispatch({ type: "AUTH_REQUEST_FAIL" });

        form.setError("phone", {
          message: "문제가 발생했습니다. 잠시 후 다시 시도해주세요.",
        });
      },
    });

  return { useVerifyPhone, useSendAuth };
};

export const deviceQueries = {
  useDeviceDetail,
  useAddDevice,
  useHandleDevice,
};
