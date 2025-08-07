"use client";

import Link from "next/link";
import { PropsWithChildren } from "react";
import Icon from "@/components/common/Icon/Icon";
import useGetDate from "@/hooks/useGetDate";
import Logo from "@/components/Logo";
import OpenStore from "./OpenStore";

export default function POSHeader({ children }: PropsWithChildren) {
  const { fullDate, fullTime, day } = useGetDate(new Date());

  return (
    <header className="flex flex-col px-[60px] pt-10">
      <div className="flex flex-row items-center justify-between">
        <Link href="/pos" className="flex flex-row items-center gap-5">
          <Logo width={60} height={60} />
          <h1 className="font-hakgyo text-primary text-2xl">모두의 웨이터</h1>
        </Link>
        <span className="text-2xl">{`${fullDate}(${day}) ${fullTime}`}</span>
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
