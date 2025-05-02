"use client";

/* eslint-disable no-alert */
/* eslint-disable react/no-unstable-nested-components */
import Checkbox from "@/components/common/Checkbox";
import { Form } from "@/components/common/Form";
import LabeledInput from "@/components/common/LabeledInput";
import useSignup from "@/hooks/useSignup";
import { TypeSignup, signupSchema } from "@/schema/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import ResponsiveButton from "@/components/common/ResponsiveButton";

export default function Signup() {
  const navigate = useRouter();
  const [isAuthSubmitted, setIsAuthSubmitted] = useState(false);
  const [isPhoneAuthenticated, setIsPhoneAuthenticated] = useState(false);
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [authTime, setAuthTime] = useState(300);
  const [makeDisabled, setMakeDisabled] = useState({
    formButton: false,
  });
  const form = useForm<TypeSignup>({
    mode: "onChange",
    resolver: zodResolver(signupSchema),
    defaultValues: {
      email: "",
      phone: "",
      authNumber: "",
      password: "",
      confirm: "",
    },
  });

  const { mutateSendPhoneAuthCode, mutateVerifyAuthCode, mutateSignup } =
    useSignup({ form, setIsPhoneAuthenticated, setAuthTime });

  // NOTE - 타이머
  useEffect(() => {
    const interval = setInterval(() => {
      setAuthTime((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setIsAuthSubmitted(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, [isAuthSubmitted]);

  const submitHandler = (data: TypeSignup) => {
    setMakeDisabled((prev) => ({ ...prev, formButton: true }));
    mutateSignup(
      {
        email: data.email,
        password: data.password,
        phoneNumber: data.phone,
      },
      {
        onSuccess: () => {
          navigate.push(`/signup/completed?email=${data.email}`);
        },
      }
    );
  };

  // NOTE - 인증 요청
  const handleAuthentication = (phoneNumber: string) => {
    setIsAuthSubmitted(true);
    const phoneRegex = /^\d{10,11}$/;
    if (!phoneRegex.test(phoneNumber)) {
      alert("올바른 전화번호를 입력해주세요. (숫자만 10-11자리)");
      return;
    }

    setAuthTime(300);
    mutateSendPhoneAuthCode({ phoneNumber });
  };

  // NOTE - 인증 확인
  const handleCheckAuth = (value: string) => {
    setIsPhoneAuthenticated(true);
    mutateVerifyAuthCode(
      {
        phoneNumber: form.getValues("phone"),
        code: Number(value),
      },
      {
        onSuccess: () => {
          alert("인증되었습니다.");
          setAuthTime(0);
          setIsAuthSubmitted(false);
        },
      }
    );
  };

  return (
    <>
      <Image
        src="/icons/logo/logo-with-text.svg"
        alt="logo with text"
        className="mb-5 md:h-[94px] md:w-[154px] lg:h-[124px] lg:w-[200px]"
        width={154}
        height={94}
      />
      <Form {...form}>
        <form
          className="flex w-[320px] gap-4 not-only:flex-col md:mt-10 md:w-[292px] lg:mt-12 lg:w-[432px]"
          onSubmit={form.handleSubmit(submitHandler)}
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
            placeholder="휴대폰 번호를 입력해주세요. (-없이 숫자만 입력)"
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
                  (!isAuthSubmitted && !form.watch("phone")?.length) ||
                  isPhoneAuthenticated
                }
                onClick={() => handleAuthentication(field.value!)}
              >
                {isAuthSubmitted ? "재인증" : "인증요청"}
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
                {isAuthSubmitted && !authTime && (
                  <div className="font-regular absolute top-1/2 right-0 -translate-y-1/2 transform text-[15px] text-gray-200 transition-all duration-300 ease-in-out sm:right-25 sm:mt-[-2px]">
                    {" "}
                    {`${String(Math.floor(authTime / 60)).padStart(2, "0")}:${String(authTime % 60).padStart(2, "0")}`}
                  </div>
                )}
                <ResponsiveButton
                  type="button"
                  color="black"
                  disabled={!isAuthSubmitted || isPhoneAuthenticated}
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
          <div className="flex w-full flex-col gap-6 rounded-[10px] border border-gray-600 p-4 md:h-[212px] lg:h-[177px]">
            <span className="text-s font-regular text-[#767676]">
              회원가입을 통해 수집한 회원의 정보는 서비스 제공에 관한 계약 성립
              및 이행(회원 및 본인식 및 본인의사 확인 등), 새로운 기능 정보
              안내(제공), 회원 관리(불만처리 등 민원처리, 고지사항 전달 등)의
              목적으로 수집되어 이용됩니다. 또한, 이용자의 개인정보는 제3자에게
              제공되지 않으며, 수집 및 이용목적이 달성된 후에는 지체 없이
              파기됩니다.
            </span>
            <div className="flex items-center gap-2">
              <Checkbox
                checked={isConsentGiven}
                onCheckedChange={() => setIsConsentGiven((prev) => !prev)}
              />
              <span className="font-regular text-gray-0 text-s lg:text-sm">
                개인정보 수집을 동의합니다 (필수)
              </span>
            </div>
          </div>
          <ResponsiveButton
            type="submit"
            color="primary"
            disabled={!isConsentGiven || makeDisabled.formButton}
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
