"use client";

import { Button } from "@/components/common/Button";
import { useSearchParams } from "next/navigation";
import React from "react";

export default function EmailError() {
  const searchParams = useSearchParams();
  const code = searchParams.get("code");

  if (!["401", "403"].includes(code!)) {
    window.location.href = "/";
  }

  return (
    <>
      <div className="flex flex-col gap-2 text-center">
        <strong className="text-gray-0 text-lg font-semibold md:text-2xl">
          {code === "401"
            ? "이메일 인증 유효기간이 만료되었습니다."
            : "이메일 인증이 되지 않았어요!"}
        </strong>
        <span className="font-regular text-sm whitespace-pre-line text-gray-300 md:text-base">
          {code === "401"
            ? "아래 재발송 버튼을 눌러 인증 메일을 다시 받아보세요."
            : "회원가입을 완료한 뒤, 하루가 지났다면\n아래 재발송 버튼을 눌러, 이메일 인증을 완료해주세요."}
        </span>
      </div>
      <Button
        color="black"
        size="lg"
        className="font-regular mt-5 h-11 w-80 lg:mt-8 lg:w-111"
      >
        이메일 재발송하기
      </Button>
    </>
  );
}
