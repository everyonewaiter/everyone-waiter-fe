"use client";

import { Button } from "@/components/common/Button";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/common/form";
import Input from "@/components/common/Input";
import { Info } from "lucide-react";
import { loginSchema, TypeLogin } from "@/schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { login } from "@/lib/api/auth.api";
import { useRouter } from "next/navigation";
import { setCookie } from "@/lib/cookies";
import SignupLayout from "../signup/layout";

export default function Login() {
  const navigate = useRouter();
  const form = useForm<TypeLogin>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const { mutate } = useMutation({
    mutationFn: login,
  });

  const submitHandler = (formData: Pick<TAccount, "email" | "password">) => {
    mutate(formData, {
      onSuccess: (data) => {
        alert("로그인 되었습니다.");
        setCookie("accessToken", data.accessToken);
        setCookie("refreshToken", data.refreshToken);
        navigate.push("/");
      },
      onError: (error) => {
        const { message } = (error as any).response.data;
        form.setError("email", { message });
        form.setError("password", { message });
      },
    });
  };

  return (
    <SignupLayout>
      <Image
        src="/images/logo-with-text.svg"
        alt="logo with text"
        className="h-[97px] w-[160px] md:h-[94px] md:w-[154px] lg:h-[124px] lg:w-[200px]"
        width={200}
        height={124}
      />
      <Form {...form}>
        <form
          className="mt-12 flex flex-col w-[320px] md:w-[292px] lg:w-[432px]"
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
                    type="email"
                    placeholder="이메일을 입력해주세요."
                    className="flex grow-1 placeholder:text-gray-300"
                    {...field}
                  />
                </FormControl>

                {form.formState.errors.email?.message && (
                  <div className="lg:text-s text-status-error flex items-center gap-1 text-xs md:text-xs">
                    <Info className="stroke-error mb-[1px] h-4 w-4" />
                    {form.formState.errors.email.message}
                  </div>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mt-3 flex w-full flex-col gap-1">
                <FormLabel>비밀번호</FormLabel>
                <FormControl>
                  <Input
                    type="password"
                    placeholder="비밀번호를 입력해주세요."
                    className="flex grow-1 placeholder:text-gray-300"
                    {...field}
                  />
                </FormControl>

                {form.formState.errors.password?.message && (
                  <div className="lg:text-s text-status-error flex items-center gap-1 text-xs md:text-xs">
                    <Info className="stroke-error mb-[1px] h-4 w-4" />
                    {form.formState.errors.password.message}
                  </div>
                )}
              </FormItem>
            )}
          />
          <Button
            type="submit"
            color="primary"
            className="font-regular mt-8 h-9 w-full md:h-9 lg:h-12"
          >
            로그인
          </Button>
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
