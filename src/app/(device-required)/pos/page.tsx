"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import QueryProviders from "@/app/query-providers";
import Button from "@/components/common/Button/Button";
import useOverlay from "@/hooks/useOverlay";
import useGetDate from "@/hooks/useGetDate";
import dynamic from "next/dynamic";
import { useDeviceContext } from "@/providers/deviceStoreProvider";
import { posQueries } from "./_queries/usePos";
import SalesModal from "./_components/modals/SalesModal";

const OpenSwitch = dynamic(() => import("./_components/OpenSwitch"), {
  ssr: false,
});

const Alert = dynamic(() => import("@/components/common/Alert/Alert"), {
  ssr: false,
});

export default function Pos() {
  const navigate = useRouter();

  const { storeId } = useDeviceContext();
  const { year, formattedMonth, formattedDate, day } = useGetDate(new Date());

  const { data, isLoading } = posQueries.useStoreInfo(storeId as string);
  const open = posQueries.useOpenStore();

  const posControl = useOverlay();
  const salesControl = useOverlay();

  const handleOpenPos = () => {
    const successHandler = () => {
      posControl.close();
      navigate.push("/pos/tables");
    };

    if (data?.status === "OPEN") {
      successHandler();
    } else {
      posControl.open(() => (
        <QueryProviders>
          <Alert
            onClose={posControl.close}
            buttonText="오픈하기"
            noResponsive
            onAction={() => {
              open.mutate(undefined, {
                onSuccess: successHandler,
                onError: (e) => {
                  if (
                    (e as any).response.data.code === "ALREADY_STORE_OPENED"
                  ) {
                    // eslint-disable-next-line no-alert
                    alert((e as any).response.data.message);
                  }
                },
              });
            }}
          >
            매장을 오픈하시겠습니까?
          </Alert>
        </QueryProviders>
      ));
    }
  };

  const openSales = () => {
    salesControl.open(() => (
      <QueryProviders>
        <SalesModal close={salesControl.close} />
      </QueryProviders>
    ));
  };

  return (
    <div className="h-screen w-screen">
      <Image
        src="/images/pos-main.png"
        fill
        alt="pos main image"
        className="object-cover"
      />
      <div className="absolute top-0 flex h-full w-full flex-col items-center justify-center gap-[80px]">
        {data?.name && (
          <div className="absolute top-0 right-0 px-[60px] py-10 text-[40px] text-red-500">
            <OpenSwitch isStoreOpen={data?.status === "OPEN"} />
          </div>
        )}
        <div className="flex flex-col gap-4">
          <span className="font-regular text-center text-2xl text-white">{`${year}년 ${formattedMonth(new Date())}월 ${formattedDate(new Date())}일 ${day}요일`}</span>
          <h1 className="h-18 text-center text-[48px] font-bold text-white">
            {isLoading || !data?.name
              ? "안녕하세요"
              : `안녕하세요, ${data?.name} 입니다.`}
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
          <button
            type="button"
            className="center h-[72px] w-full rounded-[16px] border border-white text-2xl font-semibold text-white"
            onClick={openSales}
          >
            매출액
          </button>
        </div>
      </div>
    </div>
  );
}
