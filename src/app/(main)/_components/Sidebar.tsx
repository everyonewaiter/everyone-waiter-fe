"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import Image from "next/image";
import useStores from "@/hooks/useStores";
import { useAccount } from "@/hooks/store/useAccount";
import StoreSection from "./StoreSection";

export default function Sidebar() {
  const { acceptedStoresListQuery } = useStores();
  const { data } = acceptedStoresListQuery;

  const { permission } = useAccount();

  return (
    <section className="hidden flex-col rounded-[28px] bg-white md:flex md:h-[calc(100%-40px)] md:w-[186px] md:px-3 lg:h-[calc(100%-64px)] lg:w-[318px] lg:px-5">
      <div className="flex items-center md:gap-[10px] md:pt-4 lg:gap-5 lg:pt-8">
        <Image
          src="/icons/logo/logo-medium.svg"
          alt="모두의 웨이터 로고"
          width={60}
          height={60}
          className="md:h-10 md:w-10 lg:h-15 lg:w-15"
        />
        <Image
          src="/icons/logo/logo-text.svg"
          alt="모두의 웨이터 텍스트"
          width={141}
          height={25}
          className="lg:h[25px] md:h-[16.67px] md:w-[94px] lg:w-[141px]"
        />
      </div>
      {permission !== "ADMIN" && (
        <div className="flex flex-col gap-5">
          {data?.stores?.map((item) => (
            <StoreSection key={item.storeId} {...item} />
          ))}
        </div>
      )}
      {permission === "ADMIN" && <StoreSection name="모두의 웨이터" />}
    </section>
  );
}
