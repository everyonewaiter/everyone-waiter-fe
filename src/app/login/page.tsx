"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { Form } from "@/components/common/Form";
import { loginSchema, TypeLogin } from "@/schema/login.schema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getAccount, login } from "@/lib/api/auth.api";
import { useRouter } from "next/navigation";
import { setCookie } from "@/lib/cookies";
import LabeledInput from "@/components/common/LabeledInput";
import ResponsiveButton from "@/components/common/ResponsiveButton";
import { useAccount } from "@/hooks/store/useAccount";
import { useSidebar } from "@/hooks/store/useSidebar";
import { ADMIN_MENU, USER_MENU } from "@/constants/sidebarMenus";
import SignupLayout from "../signup/layout";

export default function Login() {
  const navigate = useRouter();
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(false);
  const form = useForm<TypeLogin>({
    mode: "onChange",
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const { setProfile, setIsLoggedIn, isLoggedIn } = useAccount();
  const { setMenu } = useSidebar();

  const { data: profileData, refetch } = useQuery({
    queryKey: ["my"],
    queryFn: getAccount,
    enabled: !!isLoggedIn,
  });

  useEffect(() => {
    if (isLoggedIn && profileData) {
      setProfile({
        accountId: (profileData as TProfile)?.accountId?.toString(),
        email: profileData?.email!,
        permission: profileData?.permission!,
      });
      if (profileData?.permission === "ADMIN") {
        setMenu(ADMIN_MENU);
      } else {
        setMenu(USER_MENU);
      }
      console.log(profileData?.permission);

      navigate.push("/");
    }
  }, [isLoggedIn, profileData]);

  const { mutate } = useMutation({ mutationFn: login });

  const submitHandler = (formData: Pick<TAccount, "email" | "password">) => {
    setIsSubmitDisabled(true);
    mutate(formData, {
      onSuccess: async (data) => {
        setCookie("accessToken", data.accessToken);
        setCookie("refreshToken", data.refreshToken);
        setIsLoggedIn(true);
        refetch();
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
        src="/icons/logo/logo-with-text.svg"
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
            disabled={isSubmitDisabled}
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
