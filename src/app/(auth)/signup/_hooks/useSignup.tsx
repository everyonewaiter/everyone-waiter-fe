/* eslint-disable no-alert */
import { useMutation } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import {
  createAccount,
  sendAuthCode,
  verifyAuthCode,
} from "@/lib/api/auth.api";
import { SignupAction } from "./useSignupReducer";
import { TypeSignup } from "../_schema/signup.schema";

interface IProps {
  form: UseFormReturn<TypeSignup>;
  onDispatch: (type: SignupAction) => void;
}

const useSignup = ({ form, onDispatch }: IProps) => {
  const mutateSendPhoneAuthCode = useMutation({
    mutationFn: sendAuthCode,
    onError: (error) => {
      const { code } = (error as any).response.data;
      if ((error as any).response.status === 400) {
        if (code === "EXCEED_MAXIMUM_VERIFICATION_PHONE_NUMBER") {
          onDispatch({ type: "EXCEEDED" });
          form.setError("phone", {
            message:
              "일일 인증 가능 횟수를 초과했습니다. 24시간 후 다시 시도해주세요.",
          });
        }
      }
    },
  });

  const mutateVerifyAuthCode = useMutation({
    mutationFn: verifyAuthCode,
    onError: (error) => {
      const { code } = (error as any).response.data;
      if (code === "ALREADY_VERIFIED_PHONE_NUMBER") {
        onDispatch({ type: "VERIFY_SUCCESS" });
        alert("휴대폰 번호 인증이 이미 완료되었습니다.");
      } else if (code === "EXPIRED_VERIFICATION_CODE") {
        onDispatch({ type: "VERIFY_FAIL" });
        form.setError("authNumber", {
          message: "유효하지 않은 인증 번호입니다.",
        });
      } else if (code === "EXPIRED_VERIFICATION_PHONE_NUMBER") {
        onDispatch({ type: "VERIFY_FAIL" });
        form.setError("phone", {
          message: "휴대폰 인증 번호가 만료되었습니다.",
        });
      }
    },
  });

  const mutateSignup = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      const { code, message } = (error as any).response.data;
      if ((error as any).response.status === 400) {
        if (code === "ALREADY_USE_EMAIL") {
          form.setError("email", { message: "이미 사용중인 이메일입니다." });
        } else if (code === "ALREADY_USE_PHONE_NUMBER") {
          onDispatch({ type: "RESET" });
          form.setError("phone", {
            message: "이미 사용중인 휴대폰 번호입니다.",
          });
        } else if (code === "EXPIRED_VERIFICATION_PHONE_NUMBER") {
          onDispatch({ type: "RESET" });
          form.setError("phone", {
            message: "휴대폰 인증 번호가 만료되었습니다.",
          });
        }
      } else {
        throw new Error(message);
      }
    },
  });

  return {
    mutateSendPhoneAuthCode,
    mutateVerifyAuthCode,
    mutateSignup,
  };
};

export default useSignup;
