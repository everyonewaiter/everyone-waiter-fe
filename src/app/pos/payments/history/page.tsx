"use client";

/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useState } from "react";
import DatePicker from "@/components/common/DatePicker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/Table/Tables";
import cn from "@/lib/utils";
import Button from "@/components/common/Button/Button";
import Paginations from "@/components/common/Pagination/Paginations";
import SideLayout from "../../_components/SideLayout";
import SideSection2 from "../../_components/SideSection2";

const itemWidth = {
  "No.": "flex-[5]",
  현금: "flex-[9]",
  카드: "flex-[9]",
  합계: "flex-[9]",
  상태: "flex-[7]",
  시간: "flex-[9]",
};

interface DUMMY {
  id: string;
  cash: number;
  card: number;
  total: number;
  state: string;
  createdAt: string;
}

const dummy: DUMMY[] = [
  {
    id: "4886",
    cash: 0,
    card: 141000,
    total: 141000,
    state: "approve",
    createdAt: "2025-06-01 08:37:46",
  },
  {
    id: "4887",
    cash: 10000,
    card: 0,
    total: 10000,
    state: "cancel",
    createdAt: "2025-06-01 08:37:47",
  },
  {
    id: "4888",
    cash: 10000,
    card: 141000,
    total: 151000,
    state: "approve",
    createdAt: "2025-06-01 08:37:48",
  },
];

export default function PaymentHistory() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRow, setSelectedRow] = useState<DUMMY | null>(null);

  const handleOutsideClose = () => selectedRow && setSelectedRow(null);

  return (
    <div
      role="button"
      tabIndex={0}
      className="flex w-full cursor-pointer"
      onClick={handleOutsideClose}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") handleOutsideClose();
      }}
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
                <TableRow
                  key={item.id.toString()}
                  onClick={() => setSelectedRow(item)}
                >
                  <TableCell
                    className={itemWidth["No." as keyof typeof itemWidth]}
                  >
                    {item.id}
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
                    className={itemWidth["합계" as keyof typeof itemWidth]}
                  >
                    {item.total.toLocaleString()}원
                  </TableCell>
                  <TableCell
                    className={itemWidth["상태" as keyof typeof itemWidth]}
                  >
                    <Button
                      className="button-sm px-5 py-2"
                      color={item.state === "approve" ? "approve" : "reject"}
                    >
                      {item.state === "approve" ? "승인" : "취소"}
                    </Button>
                  </TableCell>
                  <TableCell
                    className={itemWidth["시간" as keyof typeof itemWidth]}
                  >
                    {item.createdAt}
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
      <SideLayout
        className={cn(
          "h-[calc(100dvh-134px)] transition-all duration-300 ease-in-out",
          selectedRow ? "translate-x-0" : "hidden translate-x-full"
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <SideSection2 />
      </SideLayout>
    </div>
  );
}
