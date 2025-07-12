"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/common/InputOtp";
import { useState } from "react";
import Button from "@/components/common/Button/Button";
import { useRouter, useSearchParams } from "next/navigation";
import PublicComponent from "../_components/PublicComponent";
import usePublic from "../../_queries/usePublic";

export default function Page() {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const storeId = searchParams.get("storeId") as string;
  const accessKey = searchParams.get("accessKey") as string;

  const { cancelMyTurn } = usePublic(storeId, accessKey);

  const [otpValue, setOtpValue] = useState("");

  const handleCancel = () => {
    // NOTE: optValue를 안 보냄
    cancelMyTurn.mutate(
      {
        storeId,
        accessKey,
      },
      {
        onSuccess: () => {
          navigate.push("/result?type=cancel");
        },
      }
    );
  };

  return (
    <div className="center h-screen w-screen">
      <PublicComponent
        title={`웨이팅 등록을\n취소하시겠습니까?`}
        subtitle={`웨이팅을 취소하면 다시 처음부터 대기해야 합니다.\n취소하시려면 아래 대기번호를 입력해주세요.`}
      >
        <div className="flex w-full justify-center">
          <InputOTP maxLength={2} value={otpValue} onChange={setOtpValue}>
            <InputOTPGroup className="flex items-center gap-3">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
            </InputOTPGroup>
          </InputOTP>
        </div>
      </PublicComponent>
      <div className="absolute bottom-5 flex w-full gap-2 px-5">
        <Button
          color="grey"
          className="button-lg w-20"
          onClick={() => {
            window.location.href = "kakaotalk://inappbrowser/close";
          }}
        >
          닫기
        </Button>
        <Button
          color="primary"
          className="button-lg w-full"
          onClick={handleCancel}
        >
          웨이팅 취소
        </Button>
      </div>
    </div>
  );
}
