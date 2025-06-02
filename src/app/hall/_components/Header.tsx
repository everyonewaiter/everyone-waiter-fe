"use client";

import { Button } from "@/components/common/Button/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Header() {
  const navigate = useRouter();

  return (
    <header className="flex w-full items-center justify-between rounded-[32px] bg-white px-8 py-6">
      <div className="flex items-center gap-5">
        <Image src="/icons/logo/logo.svg" alt="logo" width={60} height={60} />
        <h1 className="font-hakgyo text-primary text-[16px] lg:text-2xl">
          모두의 웨이터
        </h1>
      </div>
      <div className="relative">
        <Button
          color="grey"
          className="button-xl bg-gray-300 text-lg font-semibold text-white"
          onClick={() => navigate.push("/waiting")}
        >
          웨이팅 관리 이동
        </Button>
        <div className="bg-primary center absolute -top-5 -right-5 h-10 w-10 rounded-full text-xl font-semibold text-white">
          4
        </div>
      </div>
    </header>
  );
}
