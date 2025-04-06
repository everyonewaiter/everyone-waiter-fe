"use client";

import { Button } from "@/components/common/Button";
import Checkbox from "@/components/common/Checkbox";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/common/Form";
import Input from "@/components/common/Input";
import { TypeSignup, signupSchema } from "@/schema/signup.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { Info } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

export default function Signup() {
  const [isAuthSubmitted, setIsAuthSubmitted] = useState(false);
  const [isConsentGiven, setIsConsentGiven] = useState(false);
  const [authTime, setAuthTime] = useState(300);
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

  const submitHandler = () => {};

  return (
    <>
      <Image
        src="/images/logo-with-text.svg"
        alt="logo with text"
        className="sm:mb-5 md:h-[94px] md:w-[154px] lg:h-[124px] lg:w-[200px]"
        width={154}
        height={94}
      />
      <Form {...form}>
        <form
          className="flex gap-4 not-only:flex-col sm:w-[320px] md:mt-10 md:w-[292px] lg:mt-12 lg:w-[432px]"
          onSubmit={form.handleSubmit(submitHandler)}
        >
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1">
                <FormLabel>이메일</FormLabel>
                <FormControl>
                  <Input
                    placeholder="이메일을 입력해주세요."
                    className="flex grow-1 placeholder:text-gray-300"
                    hasError={!!form.formState.errors.email?.message}
                    {...field}
                  />
                </FormControl>

                {form.formState.errors.email?.message ? (
                  <div className="lg:text-s text-status-error flex items-center gap-1 sm:text-xs md:text-xs">
                    <Info className="stroke-error mb-[1px] h-4 w-4" />
                    {form.formState.errors.email.message}
                  </div>
                ) : (
                  <FormDescription className="lg:text-s text-gray-400 sm:text-xs md:text-xs">
                    이메일 인증 절차가 남아 있어요. 정확한 이메일을
                    입력해주세요!
                  </FormDescription>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1">
                <FormLabel>휴대폰 번호</FormLabel>
                <div className="flex gap-3">
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="휴대폰 번호를 입력해주세요. (-없이 숫자만 입력)"
                      className="flex grow-1 placeholder:text-gray-300"
                      hasError={!!form.formState.errors.phone?.message}
                      {...field}
                    />
                  </FormControl>
                  <Button
                    type="button"
                    color="black"
                    size="lg"
                    className="md:text-s sm:font-regular font-semibold sm:h-10 sm:w-[94px] sm:text-sm md:h-9 md:w-[92px] md:font-medium lg:h-12 lg:w-[100px] lg:text-[15px]"
                    disabled={!isAuthSubmitted && !form.watch("phone")?.length}
                    onClick={() => {
                      setIsAuthSubmitted(true);
                      setAuthTime(300);
                    }}
                  >
                    {isAuthSubmitted ? "재인증" : "인증요청"}
                  </Button>
                </div>
                {form.formState.errors.phone?.message && (
                  <div className="lg:text-s text-status-error flex items-center gap-1 sm:text-xs md:text-xs">
                    <Info className="stroke-error mb-[1px] h-4 w-4" />
                    {form.formState.errors.phone.message}
                  </div>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="authNumber"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1">
                <FormLabel>인증 번호</FormLabel>
                <div className="flex gap-3">
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="인증 번호를 입력해주세요."
                      className="flex grow-1 placeholder:text-gray-300"
                      hasError={!!form.formState.errors.authNumber?.message}
                      {...field}
                    />
                  </FormControl>
                  {isAuthSubmitted && (
                    <div className="font-regular absolute top-0 right-0 text-[15px] text-gray-200">
                      {`${String(Math.floor(authTime / 60)).padStart(2, "0")}:${String(authTime % 60).padStart(2, "0")}`}
                    </div>
                  )}
                  <Button
                    type="button"
                    color="black"
                    size="lg"
                    className="md:text-s sm:font-regular text-[15px] font-semibold sm:h-10 sm:w-[94px] md:h-9 md:w-[92px] md:font-medium lg:h-12 lg:w-[100px]"
                    disabled={!isAuthSubmitted}
                  >
                    확인
                  </Button>
                </div>
                {form.formState.errors.authNumber?.message && (
                  <div className="lg:text-s text-status-error flex items-center gap-1 sm:text-xs md:text-xs">
                    <Info className="stroke-error mb-[1px] h-4 w-4" />
                    {form.formState.errors.authNumber.message}
                  </div>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1">
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    className="flex grow-1 placeholder:text-gray-300"
                    hasError={!!form.formState.errors.password?.message}
                    {...field}
                  />
                </FormControl>

                {form.formState.errors.password?.message ? (
                  <div className="lg:text-s text-status-error flex items-center gap-1 sm:text-xs md:text-xs">
                    <Info className="stroke-errr mb-[1px] h-4 w-4" />
                    {form.formState.errors.password.message}
                  </div>
                ) : (
                  <FormDescription className="lg:text-s text-gray-400 sm:text-xs md:text-xs">
                    영문, 숫자, 특수문자를 조합하여 8자리 이상이어야 합니다.
                  </FormDescription>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="confirm"
            render={({ field }) => (
              <FormItem className="flex w-full flex-col gap-1">
                <FormLabel>비밀번호 확인</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="비밀번호를 다시 입력해주세요."
                    className="flex grow-1 placeholder:text-gray-300"
                    hasError={!!form.formState.errors.confirm?.message}
                    {...field}
                  />
                </FormControl>

                {form.formState.errors.confirm?.message && (
                  <div className="lg:text-s text-status-error flex items-center gap-1 sm:text-xs md:text-xs">
                    <Info className="stroke-error mb-[1px] h-4 w-4" />
                    {form.formState.errors.confirm.message}
                  </div>
                )}
              </FormItem>
            )}
          />
          <div className="flex w-full flex-col gap-6 rounded-[10px] border border-gray-600 p-4 md:h-[212px] lg:h-[177px]">
            <span className="text-s font-regular sm:text-s text-[#767676]">
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
              <span className="font-regular md:text-s text-gray-0 sm:text-s lg:text-sm">
                개인정보 수집을 동의합니다 (필수)
              </span>
            </div>
          </div>
          <Button
            type="submit"
            color="primary"
            size="lg"
            className="sm:font-regular w-full sm:h-9 md:mt-6 md:mb-6 lg:mt-8 lg:h-12"
            disabled={!isConsentGiven}
          >
            가입하기
          </Button>
        </form>
      </Form>
    </>
  );
}
