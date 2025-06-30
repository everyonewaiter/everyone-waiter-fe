"use client";

import Loading from "@/components/Loading";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { ReactNode, Suspense } from "react";

export default function SignupLayout({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <Suspense fallback={<Loading />}>
      <div className="relative flex h-screen w-screen flex-row items-center justify-center">
        <div className="relative flex h-full justify-between gap-6 lg:ml-15">
          <div
            className={`flex h-full flex-col items-center ${pathname === "/login" ? "justify-center" : "lg:justify-center"} py-[40px] md:w-[416px] ${pathname === "/login" ? "md:px-[62px] md:py-8" : "md:justify-start md:px-[62px] md:py-8"} lg:w-[660px] lg:px-[114px] lg:py-16`}
          >
            {children}
          </div>
          {/* <div className="relative hidden h-screen w-full flex-1 items-center justify-center md:block"> */}
          <div className="h-[calc(100dvh-48px)] lg:pr-6">
            <Image
              src="/images/login-cover.svg"
              alt="onboarding"
              className="h-full w-full rounded-[24px] object-cover md:mt-4"
              width={1152}
              height={1032}
              priority
            />
          </div>
        </div>
      </div>
    </Suspense>
  );
}
