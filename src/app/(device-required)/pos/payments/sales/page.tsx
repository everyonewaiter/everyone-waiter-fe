"use client";

import { useState } from "react";
import DatePicker from "@/components/common/DatePicker";
import Paginations from "@/components/common/Pagination/Paginations";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/Table/Tables";
import cn from "@/lib/utils";

const itemWidth = {
  일자: "flex-[4]",
  현금: "flex-[9]",
  카드: "flex-[9]",
  "총 주문금액": "flex-[9]",
  합계: "flex-[9]",
};

const dummy = [
  {
    createdAt: "2025-02-28 12:23:45",
    cash: 39000,
    card: 10000,
    beforeDiscount: 49000,
    total: 45000,
  },
  {
    createdAt: "2025-02-28 12:24:45",
    cash: 39000,
    card: 0,
    beforeDiscount: 39000,
    total: 35100,
  },
  {
    createdAt: "2025-02-28 12:25:45",
    cash: 0,
    card: 39000,
    beforeDiscount: 39000,
    total: 39000,
  },
];

export default function PaymentSales() {
  const [currentPage, setCurrentPage] = useState(1);

  const handleDate = (date: string) => {
    const [y, m, d] = date.split(" ")[0].split("-");

    return `${y}년 ${m}월 ${d}일`;
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className="flex w-full cursor-pointer"
      // onClick={handleOutsideClose}
      // onKeyDown={(e) => {
      //   if (e.key === "Enter" || e.key === " ") handleOutsideClose();
      // }}
    >
      <div className="flex w-full flex-1 flex-col px-[60px] pt-8 pb-6">
        <DatePicker />
        <div className="h-[704px]">
          <Table className="mt-6 w-full">
            <TableHeader>
              <TableRow isHead>
                {Object.keys(itemWidth).map((item) => (
                  <TableHead
                    key={item}
                    className={cn(
                      itemWidth[item as keyof typeof itemWidth],
                      "font-semibold"
                    )}
                  >
                    {item}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {dummy?.map((item) => (
                <TableRow key={item.createdAt.toString()}>
                  <TableCell
                    className={itemWidth["일자" as keyof typeof itemWidth]}
                  >
                    {handleDate(item.createdAt)}
                  </TableCell>
                  <TableCell
                    className={itemWidth["현금" as keyof typeof itemWidth]}
                  >
                    {item.cash.toLocaleString()}원
                  </TableCell>
                  <TableCell
                    className={itemWidth["카드" as keyof typeof itemWidth]}
                  >
                    {item.card.toLocaleString()}원
                  </TableCell>
                  <TableCell
                    className={
                      itemWidth["총 주문금액" as keyof typeof itemWidth]
                    }
                  >
                    {item.beforeDiscount.toLocaleString()}원
                  </TableCell>
                  <TableCell
                    className={itemWidth["합계" as keyof typeof itemWidth]}
                  >
                    {item.total.toLocaleString()}원
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
        <Paginations
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          size="lg:w-6 lg:h-6 md:w-5 md:h-5 hidden md:block"
          move={{
            fastforward: { hasMore: false },
            forward: { hasMore: false },
            backward: { hasMore: false },
            fastbackward: { hasMore: false },
          }}
        />
      </div>
    </div>
  );
}
