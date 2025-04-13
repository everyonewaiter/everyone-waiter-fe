"use client";

import { Button } from "@/components/common/Button";
import Paginations from "@/components/common/Pagination/Paginations";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import cn from "@/lib/utils";
import { buttonSize } from "@/styles/responsiveButton";
import Image from "next/image";
import useStores from "@/hooks/useStores";
import Row from "../store/_components/Row";

export const TABLE_HEADER = {
  "No.": "lg:w-[120px] md:w-[80px]",
  신청일: "lg:w-[482px] md:w-[160px]",
  상호명: "lg:w-[482.67px] md:w-[160px]",
  상태: "lg:w-[168px] md:w-[80px]",
  사유: "lg:w-[482.67px] md:w-[202px]",
};

export default function StoreList() {
  const navigate = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const { registerations } = useStores();

  const data = registerations?.pages[0]?.registrations;

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
      <div className="mt-4 w-full md:my-[24px] md:block">
        <div className="hidden items-center justify-center bg-gray-700 md:flex md:h-10 md:rounded-[12px] lg:h-16 lg:rounded-[16px]">
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
        <div className="flex flex-col gap-4 md:mt-4 md:gap-0">
          {data?.map((item, index) => (
            <Row key={item.createdAt} {...item} index={index} />
          ))}
        </div>
      </div>
      <div className="hidden w-full justify-end md:flex">
        <Button
          variant="outline"
          color="outline-primary"
          className={cn(
            "flex lg:gap-[6px]",
            "lg:h-10 lg:pr-5 lg:pl-4",
            buttonSize("md", "sm"),
            buttonSize("lg", "lg")
          )}
          onClick={() => navigate.push("/store/create")}
        >
          <Plus className="fill-primary h-4 w-4" />
          매장 추가
        </Button>
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
