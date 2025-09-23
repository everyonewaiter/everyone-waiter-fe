"use client";

import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { sendAuthMail } from "@/lib/api/auth.api";
import { useRouter } from "next/navigation";
import { useState } from "react";

interface IProps {
  title: string;
  subtitle: string;
  email: string;
}

export default function Resend({ title, subtitle, email }: IProps) {
  const navigate = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleResend = async () => {
    try {
      setIsLoading(true);
      await sendAuthMail({ email });
      navigate.push("/login");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <div className="flex flex-col gap-2 text-center">
        <strong className="text-gray-0 text-2xl font-semibold sm:text-lg">
          {title}
        </strong>
        <span className="font-regular text-base whitespace-pre-line text-gray-300 sm:text-sm">
          {subtitle}
        </span>
      </div>
      <ResponsiveButton
        type="button"
        responsiveButtons={{
          lg: { buttonSize: "lg" },
          md: { buttonSize: "md" },
          sm: { buttonSize: "md" },
        }}
        commonClassName="mt-8 font-regular"
        onClick={handleResend}
        disabled={isLoading}
      >
        {isLoading ? "재발송 중..." : "이메일 재발송하기"}
      </ResponsiveButton>
    </>
  );
}
