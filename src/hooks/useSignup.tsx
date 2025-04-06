/* eslint-disable no-alert */
import {
  createAccount,
  sendAuthCode,
  verifyAuthCode,
} from "@/lib/api/auth.api";
import { TypeSignup } from "@/schema/signup.schema";
import { useMutation } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";

interface IUseSignup {
  form: UseFormReturn<TypeSignup>;
  setIsPhoneAuthenticated: (value: boolean) => void;
  setAuthTime: (value: number) => void;
}

const useSignup = ({
  form,
  setIsPhoneAuthenticated,
  setAuthTime,
}: IUseSignup) => {
  const { mutate: mutateSendPhoneAuthCode } = useMutation({
    mutationFn: sendAuthCode,
    onError: (error) => {
      const { code, message } = (error as any).response.data;
      if ((error as any).response.status === 400) {
        if (code === "UNMATCHED_VERIFICATION_CODE") {
          form.setError("authNumber", { message });
        } else if (code === "ALREADY_VERIFIED_PHONE_NUMBER") {
          alert(message);
          setIsPhoneAuthenticated(true);
        } else if (code === "EXPIRED_VERIFICATION_CODE") {
          alert(message);
          setAuthTime(0);
        }
      }
    },
  });

  const { mutate: mutateVerifyAuthCode } = useMutation({
    mutationFn: verifyAuthCode,
  });

  const { mutate: mutateSignup } = useMutation({
    mutationFn: createAccount,
    onError: (error) => {
      const { code, message } = (error as any).response.data;
      if ((error as any).response.status === 400) {
        if (code === "ALREADY_USE_EMAIL") {
          form.setError("email", { message });
        } else if (code === "ALREADY_USE_PHONE_NUMBER") {
          form.setError("phone", { message });
        } else if (code === "EXPIRED_VERIFICATION_PHONE_NUMBER") {
          form.setError("phone", { message });
        } else {
          throw new Error(message);
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
