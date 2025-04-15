"use client";

import Paginations from "@/components/common/Pagination/Paginations";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import cn from "@/lib/utils";
import Image from "next/image";
import useStores from "@/hooks/useStores";
import ResponsiveButton from "@/components/common/ResponsiveButton";
import Row from "../store/_components/Row";

export const TABLE_HEADER = {
  "No.": "lg:flex-[0.69] md:flex-[0.88]",
  신청일: "lg:flex-[2.78] md:flex-[1.88]",
  상호명: "lg:flex-[2.78] md:flex-[1.88]",
  상태: "lg:flex-[0.97] md:flex-[0.88]",
  사유: "lg:flex-[2.78] md:flex-[2.48]",
};

export default function StoreList() {
  const navigate = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const { registrationList } = useStores();
  const { data } = registrationList(currentPage);

  return (
    <div className="min-h-screen w-full overflow-y-scroll rounded-[32px] bg-white p-5 md:h-[560px] md:w-[722px] md:p-8 md:px-8 lg:min-h-[1016px] lg:w-[1800px]">
      <header className="flex justify-between border-b border-b-gray-500 md:h-10 md:items-center lg:h-[68px]">
        <h1 className="text-gray-0 mb-3 text-lg font-semibold md:mb-0 md:text-base md:font-bold lg:text-[28px]">
          매장 등록 신청 현황
        </h1>
        <button type="button" className="hidden md:block lg:hidden">
          <Image
            src="/icons/hamburger.svg"
            alt="사이드 메뉴"
            width={32}
            height={32}
          />
        </button>
      </header>
      <div className="my-[24px] hidden w-full md:block">
        <div className="flex items-center justify-center bg-gray-700 md:h-10 md:rounded-[12px] lg:h-16 lg:rounded-[16px]">
          {Object.keys(TABLE_HEADER).map((key) => (
            <div
              key={key}
              className={cn(
                "text-gray-0 text-s text-center md:font-medium lg:text-base lg:font-bold",
                TABLE_HEADER[key as keyof typeof TABLE_HEADER]
              )}
            >
              {key}
            </div>
          ))}
        </div>
        <div className="flex flex-col gap-4 md:gap-0">
          {data?.registrations?.map((item, index) => (
            <Row key={item.createdAt} {...item} index={index} />
          ))}
        </div>
      </div>
      <div className="hidden w-full justify-end md:flex">
        <ResponsiveButton
          variant="outline"
          color="outline-primary"
          onClick={() => navigate.push("/store/create")}
          responsiveButtons={{
            lg: { buttonSize: "lg" },
            md: { buttonSize: "sm" },
            sm: { buttonSize: "sm" },
          }}
        >
          <div className="flex flex-row items-center lg:gap-[6px]">
            <Plus className="fill-primary h-4 w-4" />
            <span>매장 추가</span>
          </div>
        </ResponsiveButton>
      </div>
      <Paginations
        size="lg:w-6 lg:h-6 md:w-5 md:h-5 hidden md:block"
        totalPages={10}
        currentPage={currentPage}
        onSetCurrentPage={setCurrentPage}
        className="mt-8"
      />
    </div>
  );
}
