"use client";

/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable jsx-a11y/label-has-associated-control */
import { Button } from "@/components/common/Button";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import SignupLayout from "../signup/layout";

interface Form {
  email: string;
  password: string;
}

export default function Login() {
  const { register, handleSubmit } = useForm<Form>();

  const submitHandler = (_data: Form) => {
    // do something
  };

  return (
    <SignupLayout>
      <img
        src="/images/logo-with-text.svg"
        alt="logo with text"
        className="md:h-[94px] md:w-[154px] lg:h-[124px] lg:w-[200px]"
      />
      <form
        className="mt-12 md:w-[292px] lg:w-[432px]"
        onSubmit={handleSubmit(submitHandler)}
      >
        <div className="flex flex-col gap-1">
          <label
            htmlFor="email"
            className="lg:text-s text-gray-0 font-regular md:text-xs"
          >
            이메일
          </label>
          <input
            id="email"
            placeholder="이메일을 입력해주세요."
            className="md:text-s"
            {...register("email")}
          />
        </div>
        <div className="mt-4 flex flex-col gap-1">
          <label
            htmlFor="password"
            className="lg:text-s text-gray-0 font-regular md:text-xs"
          >
            비밀번호
          </label>
          <input
            id="password"
            type="password"
            placeholder="비밀번호를 입력해주세요."
            className="md:text-s"
            {...register("password")}
          />
        </div>
        <Button
          type="submit"
          color="primary"
          className="mt-8 w-full md:h-9 lg:h-12"
        >
          로그인
        </Button>
      </form>
      <span className="text-regular md:text-s mt-5 text-gray-300 lg:text-sm">
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
