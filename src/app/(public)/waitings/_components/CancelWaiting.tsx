"use client";

import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/common/InputOtp";
import cn from "@/lib/utils";
import { usePathname } from "next/navigation";

interface IProps {
  value: string;
  onChange: (value: string) => void;
}

export default function CancelWaiting({ value, onChange }: IProps) {
  const pathname = usePathname();
  const isPage = pathname.endsWith("cancel");

  return (
    <div>
      <h1
        className={cn(
          "text-gray-0 mb-3",
          isPage ? "text-center text-[28px] font-bold" : "text-xl font-semibold"
        )}
      >
        웨이팅 등록을
        <br />
        취소하시겠습니까?
      </h1>
      <span className="block text-center text-sm font-medium whitespace-pre-line text-gray-300">
        {
          "웨이팅을 취소하면 다시 처음부터 대기해야 합니다.\n취소하시려면 아래 대기번호를 입력해주세요."
        }
      </span>
      <div className="mt-10 flex justify-center">
        <InputOTP maxLength={2} value={value} onChange={onChange}>
          <InputOTPGroup className="flex gap-3">
            <InputOTPSlot
              index={0}
              className="h-21 w-[65px] !rounded-xl border-none bg-gray-700 text-4xl !font-medium"
            />
            <InputOTPSlot
              index={1}
              className="h-21 w-[65px] !rounded-xl border-none bg-gray-700 text-4xl !font-medium"
            />
          </InputOTPGroup>
        </InputOTP>
      </div>
    </div>
  );
}
