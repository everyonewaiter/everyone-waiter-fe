"use client";

import Paginations from "@/components/common/Pagination/Paginations";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import cn from "@/lib/utils";
import Image from "next/image";
import ResponsiveButton from "@/components/common/ResponsiveButton";
import { ButtonColors } from "@/components/common/Button";
import Row, { STATUS_COLORS } from "../store/_components/Row";
import MobileTableItem from "../store/_components/MobileTableItem";

export const TABLE_HEADER = {
  "No.": "lg:w-[120px] md:w-[80px]",
  신청일: "lg:w-[482px] md:w-[160px]",
  상호명: "lg:w-[482.67px] md:w-[160px]",
  상태: "lg:w-[168px] md:w-[80px]",
  사유: "lg:w-[482.67px] md:w-[202px]",
};

const DUMMY_DATA: {
  id: number;
  date: number;
  store: string;
  status: keyof typeof STATUS_COLORS;
  reason: string;
}[] = [
  {
    id: 1,
    date: 1712810000000,
    store: "모두의 웨이터",
    status: "accepted",
    reason: "-",
  },
  {
    id: 2,
    date: 1712810000000,
    store: "모두의 웨이터",
    status: "rejected",
    reason: "사업자 번호 오류",
  },
  {
    id: 3,
    date: 1712810000000,
    store: "모두의 데이터",
    status: "re-accepted",
    reason: "-",
  },
  {
    id: 4,
    date: 1712810000000,
    store: "모두의 데이터",
    status: "succeed",
    reason: "-",
  },
];

export default function StoreList() {
  const navigate = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

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
        <div>
          {/* 더미 데이터 */}
          {DUMMY_DATA.map((item, index) => (
            <Row key={item.id} {...item} index={index} />
          ))}
        </div>
      </div>
      <div className="mt-4 flex flex-col gap-4 md:hidden">
        {DUMMY_DATA.map((item) => (
          <MobileTableItem key={item.id} {...item} />
        ))}
      </div>
      <div className="hidden w-full justify-end md:flex">
        <ResponsiveButton
          variant="outline"
          color={"outline-primary" as keyof ButtonColors}
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
