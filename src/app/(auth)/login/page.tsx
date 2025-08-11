"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { useState } from "react";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { Form } from "@/components/common/Form";
import LabeledInput from "@/components/common/LabeledInput";
import Spinner from "@/components/common/Spinner";
import { TypeLogin, loginSchema } from "./_schema/login.schema";
import SignupLayout from "../signup/layout";
import useLogin from "./_hooks/useLogin";

export default function Login() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const login = useLogin();

  const form = useForm<TypeLogin>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const submitHandler = async (formData: TypeLogin) => {
    setIsSubmitted(true);
    login.mutate(
      { email: formData.email, password: formData.password },
      {
        onError: (e: any) => {
          const code = e?.response?.data?.code as string | undefined;
          const message =
            e?.response?.data?.message ?? e?.message ?? "로그인 실패";

          if (typeof code === "string" && code?.startsWith("FAILED")) {
            form.setError("email", { type: "value", message });
            form.setError("password", { type: "value", message });
            form.setFocus("email");
          }
          setIsSubmitted(false);
        },
      }
    );
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
          aria-busy={isSubmitted}
          className="mt-12 flex w-[320px] flex-col md:w-[292px] lg:w-[432px]"
          onSubmit={form.handleSubmit(submitHandler)}
        >
          <div className="flex flex-col gap-5">
            <LabeledInput
              form={form}
              name="email"
              type="email"
              label="이메일"
              placeholder="이메일을 입력해주세요."
              readOnly={isSubmitted}
              autoComplete="username"
            />
            <LabeledInput
              form={form}
              type="password"
              name="password"
              label="비밀번호"
              placeholder="비밀번호를 입력해주세요."
              readOnly={isSubmitted}
              autoComplete="current-password"
            />
          </div>
          <ResponsiveButton
            type="submit"
            responsiveButtons={{
              sm: { buttonSize: "sm" },
              md: { buttonSize: "sm" },
              lg: { buttonSize: "lg" },
            }}
            disabled={isSubmitted || form.formState.isSubmitting}
            commonClassName="w-full mt-8"
          >
            {isSubmitted ? <Spinner /> : "로그인"}
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
