/* eslint-disable no-alert */
import axios, { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import {
  createAccount,
  sendAuthCode,
  verifyAuthCode,
} from "@/lib/api/auth.api";
import { ReducerAction } from "@/hooks/useAuthReducer";
import { TypeSignup } from "../_schema/signup.schema";

interface IProps {
  form: UseFormReturn<TypeSignup>;
  onDispatch: (type: ReducerAction) => void;
}

const useSignup = ({ form, onDispatch }: IProps) => {
  const mutateSendPhoneAuthCode = useMutation({
    mutationFn: sendAuthCode,
    onMutate: () => onDispatch({ type: "CLICK_PHONE_AUTH_BTN" }),
    onSuccess: () => onDispatch({ type: "AUTH_REQUEST_SUCCESS" }),
    onError: (error) => {
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
    onSettled: () => onDispatch({ type: "AUTH_REQUEST_FAIL" }),
  });

  const mutateVerifyAuthCode = useMutation({
    mutationFn: verifyAuthCode,
    onMutate: () => onDispatch({ type: "CLICK_AUTH_CODE_BTN" }),
    onSuccess: () => {
      alert("인증되었습니다.");
      onDispatch({ type: "VERIFY_SUCCESS" });
      form.clearErrors("phone");
      form.clearErrors("authNumber");
    },
    onError: (error) => {
      if (!axios.isAxiosError(error)) {
        // eslint-disable-next-line
        alert("알 수 없는 오류가 발생했습니다.");
        return;
      }

      const axErr = error as AxiosError<any>;
      const code = (axErr?.response?.data as any)?.code as string | undefined;

      if (code === "ALREADY_VERIFIED_PHONE_NUMBER") {
        onDispatch({ type: "VERIFY_SUCCESS" });
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
    onSettled: () => onDispatch({ type: "VERIFY_FAIL" }),
    retry: false,
  });

  const mutateSignup = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      if (!axios.isAxiosError(error)) {
        // eslint-disable-next-line
        alert("알 수 없는 오류가 발생했습니다.");
        return;
      }

      const axErr = error as AxiosError<any>;
      const code = (axErr?.response?.data as any)?.code as string | undefined;

      if (code === "ALREADY_USE_EMAIL") {
        form.setError("email", {
          message: "이미 사용중인 이메일입니다.",
        });
        return;
      }

      onDispatch({ type: "RESET" });

      if (code === "ALREADY_USE_PHONE_NUMBER") {
        form.setError("phone", {
          message: "이미 사용중인 휴대폰 번호입니다.",
        });
        return;
      }

      if (code === "EXPIRED_VERIFICATION_PHONE_NUMBER") {
        form.setError("phone", {
          message: "휴대폰 인증 번호가 만료되었습니다.",
        });
        return;
      }

      // eslint-disable-next-line no-alert
      alert("문제가 발생했습니다. 잠시 후 다시 시도해주세요.");
    },
    retry: false,
  });

  return {
    mutateSendPhoneAuthCode,
    mutateVerifyAuthCode,
    mutateSignup,
  };
};

export default useSignup;
