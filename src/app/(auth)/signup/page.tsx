"use client";

import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Controller } from "react-hook-form";
import { Form, FormErrorMessage } from "@/components/common/Form";
import LabeledInput from "@/components/common/LabeledInput";
import Spinner from "@/components/common/Spinner";
import Input from "@/components/common/Input";
import phoneNumberPattern from "@/lib/formatting/formatPhoneNumber";
import Label from "@/components/common/Label";
import { personalInformationTerms } from "@/constants/personalInformationTerms";
import useAuthReducer from "@/hooks/useAuthReducer";
import useSignup from "./_hooks/useSignup";
import useSignupForm from "./_hooks/useSignupForm";
import AuthButton from "./_components/AuthButton";

const ResponsiveButton = dynamic(
  () => import("@/components/common/Button/ResponsiveButton"),
  {
    ssr: false,
  }
);

const ButtonCheckbox = dynamic(
  () => import("@/components/common/CheckboxButton"),
  {
    ssr: false,
  }
);

export default function Signup() {
  const navigate = useRouter();

  const [checked, setChecked] = useState(false);

  const { state, dispatch } = useAuthReducer();

  const isPC = useMediaQuery({ query: "(max-width: 1920px)" });

  const { form, submitHandler, disableFormButton } = useSignupForm({
    isAuthActive: state.authDisabled,
  });

  const { mutateSendPhoneAuthCode, mutateVerifyAuthCode, mutateSignup } =
    useSignup({ form, onDispatch: dispatch });

  useEffect(() => {
    if (state.authExpired) {
      form.setError("authNumber", {
        message: "인증 유효 시간이 경과하였습니다.",
      });
    }
  }, [state.authExpired, form]);

  // NOTE - 인증 요청
  const handleAuthentication = (phoneNumber: string) => {
    mutateSendPhoneAuthCode.mutate({ phoneNumber });
  };

  // NOTE - 인증 확인
  const handleCheckAuth = (value: string) => {
    mutateVerifyAuthCode.mutate({
      phoneNumber: form.watch("phone").split("-").join(""),
      code: Number(value),
    });
  };

  const handleSubmmit = () => {
    submitHandler({
      action: mutateSignup,
      onSuccess: () => {
        navigate.push(`/signup/completed?email=${form.watch("email")}`);
      },
    });
  };

  const phoneBtnLabel = useMemo(() => {
    if (state.phoneBtnLoading) return <Spinner />;
    return state.hasRequestedAuth ? "재인증" : "인증 요청";
  }, [state.phoneBtnLoading, state.hasRequestedAuth]);

  return (
    <>
      <div className="flex w-full justify-center">
        <Image
          src="/logo/logo-with-text.svg"
          alt="logo with text"
          className="mb-5 md:h-[94px] md:w-[154px] lg:h-[124px] lg:w-[200px]"
          width={154}
          height={94}
          priority
        />
      </div>
      <Form {...form}>
        <form
          className="flex w-[320px] flex-col gap-4 md:mt-10 md:w-[292px] lg:mt-12 lg:w-[432px]"
          onSubmit={form.handleSubmit(handleSubmmit)}
        >
          <LabeledInput
            form={form}
            name="email"
            label="이메일"
            placeholder="이메일을 입력해주세요."
            defaultMessage="이메일 인증 절차가 남아 있어요. 정확한 이메일을 입력해주세요!"
          />
          <div className="flex flex-col gap-2">
            <Label>휴대폰 번호</Label>
            <Controller
              name="phone"
              control={form.control}
              disabled={state.phoneDisabled}
              render={({ field }) => (
                <div className="flex items-center gap-3">
                  <Input
                    {...field}
                    placeholder={`휴대폰 번호를 입력해주세요.${isPC ? "" : " (-없이 숫자만 입력)"}`}
                    onChange={(e) => {
                      const formatted = phoneNumberPattern(e.target.value);
                      form.setValue("phone", formatted);
                    }}
                    hasError={!!form.formState.errors.phone}
                  />
                  <ResponsiveButton
                    type="button"
                    variant="default"
                    color="black"
                    responsiveButtons={{
                      sm: { buttonSize: "sm", className: "w-[120px]" },
                      md: { buttonSize: "sm", className: "w-[94px]" },
                      lg: { buttonSize: "lg", className: "w-[120px]" },
                    }}
                    disabled={!form.watch("phone") || state.phoneBtnDisabled}
                    onClick={() =>
                      handleAuthentication(field.value.split("-").join(""))
                    }
                  >
                    {phoneBtnLabel}
                  </ResponsiveButton>
                </div>
              )}
            />
            <FormErrorMessage>
              {form.formState.errors.phone?.message?.toString()}
            </FormErrorMessage>
          </div>
          <div className="flex flex-col gap-2">
            <Label>인증 번호</Label>
            <Controller
              name="authNumber"
              control={form.control}
              disabled={state.authDisabled}
              render={({ field }) => (
                <div className="flex items-center gap-3">
                  <div className="relative w-full">
                    <Input
                      {...field}
                      placeholder="인증 번호를 입력해주세요."
                      hasError={!!form.formState.errors.authNumber}
                      className="!pr-10 md:!pr-13 lg:!pr-15"
                    />
                    {state.startTimer && (
                      <div className="font-regular absolute top-5 right-3 mt-[-2px] -translate-y-1/2 transform text-xs text-gray-200 transition-all duration-300 ease-in-out md:top-5 md:right-4 lg:top-6.5 lg:right-3 lg:text-[15px]">
                        {`${String(Math.floor(state.authTime / 60)).padStart(2, "0")}:${String(state.authTime % 60).padStart(2, "0")}`}
                      </div>
                    )}
                  </div>
                  <AuthButton
                    loading={state.authBtnLoading}
                    disabled={state.authBtnDisabled}
                    onCheckAuth={() => handleCheckAuth(field.value)}
                  />
                </div>
              )}
            />
            <FormErrorMessage>
              {form.formState.errors.authNumber?.message?.toString()}
            </FormErrorMessage>
          </div>
          <LabeledInput
            form={form}
            type="password"
            name="password"
            label="비밀번호"
            placeholder="비밀번호를 입력해주세요."
            defaultMessage="영문, 숫자, 특수문자를 조합하여 8자리 이상이어야 합니다."
          />
          <LabeledInput
            form={form}
            type="password"
            name="confirm"
            label="비밀번호 확인"
            placeholder="비밀번호를 다시 입력해주세요."
          />
          <div className="flex h-auto w-full flex-col gap-6 rounded-[10px] border border-gray-600 p-4">
            <span className="text-s font-regular text-[#767676]">
              {personalInformationTerms}
            </span>

            <div className="flex items-center gap-2">
              <ButtonCheckbox
                aria-label="개인정보 수집 동의 체크박스"
                checked={checked}
                onChange={() => setChecked((prev) => !prev)}
              />
              <span className="font-regular text-gray-0 text-s leading-snug lg:text-sm">
                개인정보 수집을 동의합니다 (필수)
              </span>
            </div>
          </div>
          <ResponsiveButton
            type="submit"
            color="primary"
            disabled={
              !checked || disableFormButton || !form.watch("authNumber")
            }
            responsiveButtons={{
              lg: { buttonSize: "lg" },
              md: { buttonSize: "md", className: "my-6" },
              sm: { buttonSize: "md", className: "mb-6" },
            }}
            commonClassName="font-regular w-full"
          >
            {disableFormButton ? <Spinner /> : "가입하기"}
          </ResponsiveButton>
        </form>
      </Form>
    </>
  );
}
