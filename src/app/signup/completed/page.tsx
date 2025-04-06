"use client";

import Image from "next/image";
import { useSearchParams } from "next/navigation";

export default function SignupCompleted() {
  const searchParams = useSearchParams();
  const email = searchParams.get("email");

  return (
    <div className="mt-[-100px] flex h-full w-full flex-col items-center justify-center gap-6 text-center md:mt-[-20px]">
      <Image
        src="/gif/signup-completed.gif"
        width={150}
        height={150}
        alt="회원가입 로딩 이미지"
        className="sm:h-[80px] sm:w-[80px] md:h-30 md:w-30 lg:h-[150px] lg:w-[150px]"
      />
      <div className="flex flex-col gap-2 md:mt-0 lg:mt-7">
        <p className="text-gray-0 font-semibold sm:text-lg md:text-lg lg:text-2xl">
          회원가입이 완료되었습니다.
        </p>
        {/* Show at Mobile - start */}
        <div className="mt-4 mb-5 hidden items-center justify-center rounded-[12px] bg-gray-700 text-gray-300 sm:flex sm:h-14 md:h-[51px] md:w-[292px] md:text-lg md:font-medium lg:h-[60px] lg:w-[432px] lg:text-xl">
          {email}
        </div>
        <div className="font-regular hidden flex-col gap-1 text-center text-gray-300 sm:flex sm:text-sm">
          <span className="text-base font-medium text-[#191919]">
            이메일 인증을 위해 이메일을 발송하였습니다.
          </span>
          <span>메일 수신이 되지 않았다면, 스팸 메일함을 확인해주세요.</span>
        </div>
        {/* Show at Mobile - end */}
        <span className="font-regular block text-center text-gray-300 sm:hidden sm:text-sm md:text-sm lg:text-lg">
          이메일 인증을 위해 등록하신 이메일을 확인해주세요.
          <br />
          인증을 완료하셔야 서비스 이용이 가능합니다.
        </span>
      </div>
      <div className="mt-8 flex items-center justify-center rounded-[12px] bg-gray-700 text-gray-300 sm:hidden md:h-[51px] md:w-[292px] md:text-lg md:font-medium lg:h-[60px] lg:w-[432px] lg:text-xl">
        asdfasdf@gmail.com
      </div>
    </div>
  );
}
