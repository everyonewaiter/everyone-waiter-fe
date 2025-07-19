"use client";

/* eslint-disable no-alert */
/* eslint-disable react/no-unstable-nested-components */
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";
import { Form } from "@/components/common/Form";
import LabeledInput from "@/components/common/LabeledInput";
import useSignup from "./_hooks/useSignup";
import useSignupForm from "./_hooks/useSignupForm";
import { TypeSignup } from "./_schema/signup.schema";

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
  const [authTime, setAuthTime] = useState(300);

  const isPC = useMediaQuery({ query: "(max-width: 1920px)" });

  const {
    form,
    submitHandler,
    disableFormButton,
    isSubmitted,
    handleSubmitValue,
  } = useSignupForm();

  const { mutateSendPhoneAuthCode, mutateVerifyAuthCode, mutateSignup } =
    useSignup({
      form,
      setCodeSubmited: (value) => handleSubmitValue("codeAuth", value),
      setAuthTime,
    });

  // NOTE - 타이머
  useEffect(() => {
    const interval = setInterval(() => {
      setAuthTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitValue("phoneAuth", false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isSubmitted.phoneAuth, handleSubmitValue]);

  // NOTE - 인증 요청
  const handleAuthentication = (phoneNumber: string) => {
    handleSubmitValue("phoneAuth", true);

    const phoneRegex = /^\d{10,11}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert("올바른 전화번호를 입력해주세요. (숫자만 10-11자리)");
      return;
    }

    setAuthTime(300);
    mutateSendPhoneAuthCode.mutate({ phoneNumber });
  };

  // NOTE - 인증 확인
  const handleCheckAuth = (value: string) => {
    handleSubmitValue("codeAuth", true);

    mutateVerifyAuthCode.mutate(
      {
        phoneNumber: form.getValues("phone"),
        code: Number(value),
      },
      {
        onSuccess: () => {
          alert("인증되었습니다.");
          setAuthTime(0);
          handleSubmitValue("phoneAuth", true);
        },
      }
    );
  };

  const handleSubmmit = (data: TypeSignup) => {
    submitHandler(data, mutateSignup, () =>
      navigate.push(`/signup/completed?email=${data.email}`)
    );
  };

  return (
    <>
      <div className="flex w-full justify-center">
        <Image
          src="/logo/logo-with-text.svg"
          alt="logo with text"
          className="mb-5 md:h-[94px] md:w-[154px] lg:h-[124px] lg:w-[200px]"
          width={154}
          height={94}
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
          <LabeledInput
            form={form}
            name="phone"
            label="휴대폰 번호"
            placeholder={`휴대폰 번호를 입력해주세요.${isPC ? "" : " (-없이 숫자만 입력)"}`}
            rightComponent={(field) => (
              <ResponsiveButton
                type="button"
                variant="default"
                color="black"
                responsiveButtons={{
                  sm: { buttonSize: "sm", className: "w-[120px]" },
                  md: { buttonSize: "sm", className: "w-[94px]" },
                  lg: { buttonSize: "lg", className: "w-[120px]" },
                }}
                disabled={
                  (!isSubmitted.phoneAuth && !form.watch("phone")?.length) ||
                  isSubmitted.codeAuth
                }
                onClick={() => handleAuthentication(field.value!)}
              >
                {isSubmitted.phoneAuth ? "재인증" : "인증요청"}
              </ResponsiveButton>
            )}
          />
          <LabeledInput
            form={form}
            name="authNumber"
            label="인증 번호"
            placeholder="인증 번호를 입력해주세요."
            rightComponent={(field) => (
              <>
                {isSubmitted.phoneAuth && !authTime && (
                  <div className="font-regular absolute top-1/2 right-0 -translate-y-1/2 transform text-[15px] text-gray-200 transition-all duration-300 ease-in-out sm:right-25 sm:mt-[-2px]">
                    {" "}
                    {`${String(Math.floor(authTime / 60)).padStart(2, "0")}:${String(authTime % 60).padStart(2, "0")}`}
                  </div>
                )}
                <ResponsiveButton
                  type="button"
                  color="black"
                  disabled={!isSubmitted.phoneAuth || isSubmitted.codeAuth}
                  onClick={() => handleCheckAuth(field.value!)}
                  responsiveButtons={{
                    sm: { buttonSize: "sm", className: "w-[120px]" },
                    md: { buttonSize: "sm", className: "w-[94px]" },
                    lg: { buttonSize: "lg", className: "w-[120px]" },
                  }}
                >
                  확인
                </ResponsiveButton>
              </>
            )}
          />
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
              회원가입을 통해 수집한 회원의 정보는 서비스 제공에 관한 계약 성립
              및 이행(회원 및 본인식 및 본인의사 확인 등), 새로운 기능 정보
              안내(제공), 회원 관리(불만처리 등 민원처리, 고지사항 전달 등)의
              목적으로 수집되어 이용됩니다. 또한, 이용자의 개인정보는 제3자에게
              제공되지 않으며, 수집 및 이용목적이 달성된 후에는 지체 없이
              파기됩니다.
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
            disabled={!checked || disableFormButton}
            responsiveButtons={{
              lg: { buttonSize: "lg" },
              md: { buttonSize: "md", className: "my-6" },
              sm: { buttonSize: "md", className: "mb-6" },
            }}
            commonClassName="font-regular w-full"
          >
            가입하기
          </ResponsiveButton>
        </form>
      </Form>
    </>
  );
}
