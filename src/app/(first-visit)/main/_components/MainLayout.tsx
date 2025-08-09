import MobileHeader from "@/app/(main)/_components/MobileLayout/MobileHeader";
import PopupButton from "@/app/(main)/_components/PageTitle/PopupButton";
import Logo from "@/components/Logo";
import Link from "next/link";
import { PropsWithChildren } from "react";

export default function MainLayout({ children }: PropsWithChildren) {
  return (
    <>
      <header className="hidden flex-col items-center justify-between md:flex md:gap-4 md:px-6 md:pt-5 lg:gap-6 lg:px-15 lg:pt-10">
        <div className="flex w-full items-center justify-between">
          <Link
            href="/main"
            className="flex w-full items-center md:gap-3 lg:gap-5"
          >
            <Logo
              width={60}
              height={60}
              className="md:h-10 md:w-10 lg:h-15 lg:w-15"
            />
            <h1 className="font-hakgyo text-primary md:text-base lg:text-2xl">
              모두의 웨이터
            </h1>
          </Link>
          <PopupButton />
        </div>
        <div className="h-[1px] w-full bg-gray-600" />
      </header>
      <MobileHeader href="/main" />
      <main className="flex flex-1 flex-col">{children}</main>
    </>
  );
}
