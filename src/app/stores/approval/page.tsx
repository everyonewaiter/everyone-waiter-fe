"use client";

import Paginations from "@/components/common/Pagination/Paginations";
import SectionHeader from "@/components/SectionHeader";
import Table from "@/components/Table";
import { Search } from "lucide-react";
import { useState } from "react";

const itemWidths = {
  "No.": {
    className: "basis-[8.6%] md:basis-[11.7%]",
    text: "index",
  },
  신청일: {
    className: "basis-[26.5%] md:basis-[23.5%]",
    text: "createdAt",
  },
  신청자: {
    className: "basis-[26.5%] md:basis-[29.6%]",
    text: "ceoName",
  },
  상호명: {
    className: "basis-[26.5%] md:basis-[23.5%]",
    text: "name",
  },
  상태: {
    className: "basis-[12%] md:basis-[11.7%]",
    text: "status",
  },
};

export default function StoreApproval() {
  const data: any[] = [];

  const [currentPage, setCurrentPage] = useState(1);
  const [searchWord, setSearchWord] = useState("");

  const submitHandler = () => {};

  return (
    <div className="h-full w-full">
      <SectionHeader title="매장 등록 신청 현황" />
      <div className="mt-4 flex w-full justify-end md:mt-6">
        <div className="mx-5 flex h-9 w-full items-center justify-between gap-3 rounded-[24px] border border-gray-600 bg-gray-700 px-4 md:mx-0 md:w-70 lg:h-[46px]">
          <input
            className="w-full text-sm outline-none lg:text-base"
            placeholder="검색어를 입력해주세요."
            value={searchWord}
            onChange={(e) => setSearchWord(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                submitHandler();
              }
            }}
          />
          <Search
            width={24}
            height={24}
            className="h-5 w-5 text-gray-300 lg:h-6 lg:w-6"
          />
        </div>
      </div>
      <Table>
        <Table.THeadLayout>
          {Object.keys(itemWidths).map((key) => (
            <Table.THead
              key={key}
              value={key}
              className={itemWidths[key as keyof typeof itemWidths].className}
            />
          ))}
        </Table.THeadLayout>
        <Table.RowLayout>
          {data?.map((item, idx) => (
            <Table.Row
              key={item.registrationId.toString()}
              {...item}
              index={idx + 1}
              itemWidths={itemWidths}
            />
          ))}
        </Table.RowLayout>
      </Table>
      <Paginations
        size="lg:w-6 lg:h-6 md:w-5 md:h-5 hidden md:block"
        totalPages={1}
        currentPage={currentPage}
        onSetCurrentPage={setCurrentPage}
        className="mt-8"
      />
    </div>
  );
}
