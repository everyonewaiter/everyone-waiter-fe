import Image from "next/image";
import { PropsWithChildren } from "react";

export default function Layout({ children }: PropsWithChildren) {
  return (
    <div className="h-screen w-screen bg-gray-700">
      <div className="hidden h-full w-full flex-col md:flex">
        <header className="flex flex-col gap-6 px-[60px] pt-[40px]">
          <div className="flex w-full items-center gap-5">
            <Image
              src="/logo/logo-medium.svg"
              alt="모두의 웨이터 로고"
              width={60}
              height={60}
            />
            <h1 className="font-hakgyo text-primary text-2xl">모두의 웨이터</h1>
          </div>
          <div className="h-[1px] w-full bg-gray-500" />
        </header>
        <div className="flex flex-1 items-center justify-center pb-[112px]">
          {children}
        </div>
      </div>
      <div className="flex md:hidden">{children}</div>
    </div>
  );
}
