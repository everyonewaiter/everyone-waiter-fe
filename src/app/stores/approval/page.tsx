"use client";

import Paginations from "@/components/common/Pagination/Paginations";
import SectionHeader from "@/components/SectionHeader";
import Table from "@/components/Table";
import useStores from "@/hooks/useStores";
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
  const { registrationList } = useStores();
  const { data } = registrationList(1);

  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="h-full w-full">
      <SectionHeader title="매장 등록 승인" />
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
          {data?.registrations.map((item, idx) => (
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
        totalPages={data?.registrationCount!}
        currentPage={currentPage}
        onSetCurrentPage={setCurrentPage}
        className="mt-8"
      />
    </div>
  );
}
