"use client";

import Image from "next/image";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";
import cn from "@/lib/utils";

export default function SignupLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isLogin = pathname === "/login";

  return (
    <div className="relative flex h-dvh w-dvw flex-row items-center justify-center">
      <div className="relative flex h-dvh w-dvw flex-row items-center justify-center">
        <div className="relative flex h-dvh justify-between gap-6 lg:ml-15">
          <div
            className={cn(
              "scrollbar-hide flex h-full flex-col items-center py-[40px] md:w-[416px] md:overflow-x-hidden md:overflow-y-auto lg:w-[660px] lg:px-[114px] lg:py-16",
              isLogin
                ? "justify-center md:px-[62px] md:py-8"
                : "md:justify-start md:px-[62px] md:py-8 lg:justify-center"
            )}
          >
            {children}
          </div>
          <div className="hidden h-dvh items-center md:flex lg:pr-6">
            <Image
              src="/images/login-cover.svg"
              alt="onboarding"
              className="h-[calc(100dvh-48px)] w-full rounded-3xl object-cover"
              width={1152}
              height={1032}
              priority
              fetchPriority="high"
              sizes="(min-width:1024px) 50vw, 100vw"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
