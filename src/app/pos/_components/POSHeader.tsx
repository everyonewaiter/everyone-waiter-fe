"use client";

import { ReactNode } from "react";
import Link from "next/link";
import Icon from "@/components/common/Icon";
import useGetDate from "@/hooks/useGetDate";
import Image from "next/image";
import OpenStore from "./OpenStore";

export default function POSHeader({ children }: { children?: ReactNode }) {
  const now = new Date();
  const { fullDate, day, time } = useGetDate(now);

  return (
    <header className="flex flex-col px-[60px] pt-10">
      <div className="flex flex-row items-center justify-between">
        <Link href="/pos" className="flex flex-row items-center gap-5">
          <Image
            src="/icons/logo/logo.svg"
            alt="모두의 웨이터 로고"
            width={60}
            height={60}
          />
          <h1 className="font-hakgyo text-primary text-2xl">모두의 웨이터</h1>
        </Link>
        <span className="text-2xl">{`${fullDate}(${day}) ${time}`}</span>
        <div className="flex flex-row items-center gap-6">
          {children || (
            <Link
              href="/pos/payments/history"
              className="text-gray-0 font-regular flex flex-row gap-[10px] rounded-[12px] border border-gray-600 px-4 py-3 text-lg"
            >
              <Icon iconKey="file-check" size={28} />
              <span>결제 내역</span>
            </Link>
          )}
          <OpenStore />
        </div>
      </div>
      <div className="mt-8 h-[1px] w-full bg-gray-600" />
    </header>
  );
}
