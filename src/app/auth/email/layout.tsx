import Image from "next/image";
import { ReactNode } from "react";

export default function BlankLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-screen w-screen flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-center">
        <Image
          src="/images/hourglass.svg"
          alt="이메일 인증 만료"
          width={180}
          height={180}
          className="mb-5 h-[140px] w-[140px] md:mb-5 md:h-[140px] md:w-[140px] lg:mb-10 lg:h-[180px] lg:w-[180px]"
        />
        {children}
      </div>
    </div>
  );
}
