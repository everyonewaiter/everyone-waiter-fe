"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
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
} from "@/components/common/Form";
import Input from "@/components/common/Input";
import { Info } from "lucide-react";
import { loginSchema, TypeLogin } from "@/schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import SignupLayout from "../signup/layout";

export default function Login() {
  const form = useForm<TypeLogin>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
  });

  return (
    <SignupLayout>
      <Image
        src="/images/logo-with-text.svg"
        alt="logo with text"
        className="sm:h-[97px] sm:w-[160px] md:h-[94px] md:w-[154px] lg:h-[124px] lg:w-[200px]"
        width={200}
        height={124}
      />
      <Form {...form}>
        <form
          className="mt-12 flex flex-col sm:w-[320px] md:w-[292px] lg:w-[432px]"
          // onSubmit={handleSubmit(submitHandler)}
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
                  <div className="lg:text-s text-status-error flex items-center gap-1 sm:text-xs md:text-xs">
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
                  <div className="lg:text-s text-status-error flex items-center gap-1 sm:text-xs md:text-xs">
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
            className="font-regular mt-8 w-full sm:h-9 md:h-9 lg:h-12"
          >
            로그인
          </Button>
        </form>
      </Form>
      <span className="text-regular md:text-s mt-5 text-gray-300 sm:text-xs lg:text-sm">
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
