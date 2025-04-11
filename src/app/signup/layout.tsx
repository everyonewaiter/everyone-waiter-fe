"use client";

/* eslint-disable no-nested-ternary */
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ReactNode, useEffect, useState } from "react";

export default function SignupLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const [isSmallHeight, setIsSmallHeight] = useState(false);

  useEffect(() => {
    const checkHeight = () => {
      setIsSmallHeight(window.innerHeight < 800);
    };

    checkHeight();
    window.addEventListener("resize", checkHeight);
    return () => window.removeEventListener("resize", checkHeight);
  }, []);

  return (
    <div className="relative flex min-h-screen w-screen flex-row items-center justify-center">
      <div className="relative flex h-full justify-between md:w-[936px] lg:w-[1860px]">
        <div
          className={`flex flex-col items-center ${
            pathname === "/login"
              ? "justify-center"
              : isSmallHeight
                ? "justify-start py-[40px]"
                : "justify-center md:justify-center"
          } scroll- justify-self-start md:w-[416px] md:px-[62px] md:py-8 lg:w-[660px] lg:px-[114px] lg:py-16`}
        >
          {children}
        </div>
        <div className="relative hidden h-screen w-full items-center justify-center md:flex">
          <Image
            src="/images/login-cover.svg"
            alt="onboarding"
            className="d:h-[568px] rounded-[24px] object-cover md:w-[488px] lg:h-[1032px] lg:w-[1152px]"
            width={488}
            height={568}
          />
        </div>
      </div>
    </div>
  );
}
