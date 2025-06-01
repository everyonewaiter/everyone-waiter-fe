"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/common/Button";
import useGetDate from "@/hooks/useGetDate";
import Image from "next/image";
import useOverlay from "@/hooks/use-overlay";
import Alert from "@/components/common/Alert/Alert";
import useStoreOpenStore from "@/stores/useStoreOpenStore";
import Link from "next/link";
import QueryProviders from "../query-providers";
import OpenSwitch from "./_components/OpenSwitch";

export default function Pos() {
  const now = new Date();
  const navigate = useRouter();

  const { date, day } = useGetDate(now);
  const { open, close } = useOverlay();
  const { storeOpen } = useStoreOpenStore();

  const handleOpenPos = () => {
    open(() => (
      <QueryProviders>
        <Alert
          onClose={close}
          buttonText="오픈하기"
          onAction={() => {
            storeOpen();
            close();
            navigate.push("/pos/tables");
          }}
        >
          매장을 오픈하시겠습니까?
        </Alert>
      </QueryProviders>
    ));
  };

  return (
    <div className="h-screen w-screen">
      <Image
        src="/images/pos-main.png"
        width={1920}
        height={1080}
        alt="pos main image"
        className="object-cover"
      />
      <div className="absolute top-0 flex h-full w-full flex-col items-center justify-center gap-[80px]">
        <div className="absolute top-0 right-0 px-[60px] py-10 text-[40px] text-red-500">
          <OpenSwitch />
        </div>
        <div className="flex flex-col gap-4">
          <span className="font-regular text-center text-2xl text-white">{`${date.year}년 ${date.month}월 ${date.date}일 ${day}요일`}</span>
          <h1 className="text-[48px] font-bold text-white">
            안녕하세요, [매장명] 입니다.
          </h1>
        </div>
        <div className="flex flex-col gap-4">
          <Button
            color="black"
            className="h-[120px] !w-[659px] rounded-[16px] text-3xl font-bold"
            onClick={handleOpenPos}
          >
            POS
          </Button>
          <Link href="/pos/payments/history" className="w-full">
            <button
              type="button"
              className="center h-[72px] w-full rounded-[16px] border border-white text-2xl font-semibold text-white"
            >
              결제내역
            </button>
          </Link>
          <Link href="/pos/payments/sales" className="w-full">
            <button
              type="button"
              className="center h-[72px] w-full rounded-[16px] border border-white text-2xl font-semibold text-white"
            >
              매출액
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
