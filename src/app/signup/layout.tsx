"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

export default function SignupLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <div className="relative flex h-screen w-screen flex-row items-center justify-center">
      <div className="relative flex h-full justify-between md:w-[936px] lg:w-[1860px]">
        <div
          className={`flex flex-col items-center ${pathname === "/login" ? "md:justify-center" : "md:justify-start"} justify-self-start md:w-[416px] md:px-[62px] md:py-8 lg:w-[660px] lg:px-[114px] lg:py-16`}
        >
          {children}
        </div>
        <div className="flex items-center justify-center md:fixed md:right-4 md:h-[600px] md:w-[520px] lg:relative lg:h-[1080px] lg:w-[1200px]">
          <Image
            src="/images/login-cover.svg"
            alt="onboarding"
            className="rounded-[24px] object-cover md:h-[568px] md:w-[488px] lg:h-[1032px] lg:w-[1152px]"
            width={488}
            height={568}
          />
        </div>
      </div>
    </div>
  );
}
