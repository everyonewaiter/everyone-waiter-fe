"use client";

/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-alert */
import { Button } from "@/components/common/Button";
import { verifyEmail } from "@/lib/api/auth.api";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, useState } from "react";

export default function EmailError() {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const accessToken = searchParams.get("accessToken");
  const [errorCode, setErrorCode] = useState<number | null>(null);

  const { mutate } = useMutation({
    mutationFn: verifyEmail,
    onSuccess: () => {
      alert("인증되었습니다.");
      navigate.push("/login");
    },
    onError: (error) => {
      const { code, message } = (error as any).response.data;
      if ((error as any).response.status === 400) {
        if (code === "ALREADY_VERIFIED_EMAIL") {
          alert(message);
          navigate.push("/login");
        } else if (code === "EXPIRED_VERIFICATION_EMAIL") {
          setErrorCode(400);
        }
      } else if ((error as any).response.status === 404) {
        setErrorCode(404);
      } else {
        setErrorCode((error as any).response.status);
      }
    },
  });

  useEffect(() => {
    if (accessToken) {
      mutate({ token: accessToken });
    }
  }, [searchParams, accessToken]);

  if (![400, 404].includes(errorCode!)) return null;

  return (
    <>
      <div className="flex flex-col gap-2 text-center">
        <strong className="text-gray-0 text-2xl font-semibold sm:text-lg">
          {errorCode === 400 && "이메일 인증 유효기간이 만료되었습니다."}
          {errorCode === 404 && "이메일 인증이 되지 않았어요!"}
        </strong>
        <span className="font-regular text-base whitespace-pre-line text-gray-300 sm:text-sm">
          {errorCode === 400 &&
            "아래 재발송 버튼을 눌러 인증 메일을 다시 받아보세요."}
          {errorCode === 404 &&
            "회원가입을 완료한 뒤, 하루가 지났다면\n아래 재발송 버튼을 눌러, 이메일 인증을 완료해주세요."}
        </span>
      </div>
      <Button
        color="black"
        size="lg"
        className="sm:font-regular mt-8 w-111 sm:mt-5 sm:h-11 sm:w-80"
      >
        이메일 재발송하기
      </Button>
    </>
  );
}
