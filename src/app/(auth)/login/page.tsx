"use client";

import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Form } from "@/components/common/Form";
import { loginSchema, TypeLogin } from "@/schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";

import LabeledInput from "@/components/common/LabeledInput";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";

import SignupLayout from "../signup/layout";
import useLogin from "./_hooks/useLogin";

export default function Login() {
  const { mutate: login } = useLogin();
  const form = useForm<TypeLogin>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = (formData: TypeLogin) => {
    login(formData);
  };

  return (
    <SignupLayout>
      <Image
        src="/logo/logo-with-text.svg"
        alt="logo with text"
        className="h-[97px] w-[160px] md:h-[94px] md:w-[154px] lg:h-[124px] lg:w-[200px]"
        width={200}
        height={124}
        priority
      />
      <Form {...form}>
        <form
          className="mt-12 flex w-[320px] flex-col md:w-[292px] lg:w-[432px]"
          onSubmit={form.handleSubmit(submitHandler)}
        >
          <div className="flex flex-col gap-3">
            <LabeledInput
              form={form}
              name="email"
              label="이메일"
              placeholder="이메일을 입력해주세요."
            />
            <LabeledInput
              form={form}
              type="password"
              name="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요."
            />
          </div>
          <ResponsiveButton
            type="submit"
            responsiveButtons={{
              sm: { buttonSize: "sm" },
              md: { buttonSize: "sm" },
              lg: { buttonSize: "lg" },
            }}
            commonClassName="w-full mt-8"
            disabled={!form.formState.isValid}
          >
            로그인
          </ResponsiveButton>
        </form>
      </Form>
      <span className="text-regular md:text-s mt-5 text-xs text-gray-300 lg:text-sm">
        계정이 없으신가요? 간편하게{" "}
        <Link
          href="/signup"
          className="text-primary underline md:underline-offset-4 lg:underline-offset-6"
        >
          회원가입
        </Link>
        을 할 수 있어요!
      </span>
    </SignupLayout>
  );
}
