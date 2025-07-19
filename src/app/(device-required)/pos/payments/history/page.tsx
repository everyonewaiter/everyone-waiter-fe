"use client";

/* eslint-disable jsx-a11y/no-static-element-interactions */
import { useEffect, useState } from "react";
import Button from "@/components/common/Button/Button";
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
import useGetDate from "@/hooks/useGetDate";
import SideSection2 from "../../_components/SideSection2";
import SideLayout from "../../_components/SideSection/SideLayout";
import { paymentListQueries } from "../../_queries/usePaymentList";

const itemWidth = {
  "No.": "flex-[4]",
  결제수단: "flex-[5]",
  승인번호: "flex-[8]",
  현금영수증: "flex-[6]",
  합계: "flex-[9]",
  상태: "flex-[5]",
  결제시간: "flex-[9]",
};

export interface DUMMY {
  id: string;
  cash: number;
  card: number;
  total: number;
  state: string;
  createdAt: string;
}

export default function PaymentHistory() {
  const now = new Date();
  const { formattedMonth, formattedDate } = useGetDate(now);

  const [selectedRow, setSelectedRow] = useState<OrderPaymentsList | null>(
    null
  );
  const [date, setDate] = useState<Date | null>(now);
  const formatted = date
    ? `${date.getFullYear()}${formattedMonth}${formattedDate}`
    : "";

  const { data, refetch, isLoading } =
    paymentListQueries.usePaymentsList(formatted);

  useEffect(() => {
    refetch();
  }, [formatted, refetch]);

  return (
    <div className="flex h-[calc(100dvh-133px)] w-full">
      <div className="relative flex w-full flex-1 flex-col px-[60px] pt-8 pb-6">
        <DatePicker date={date} onSetDate={setDate} />
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
            {!isLoading && data?.orderPayments.length && (
              <TableBody>
                {data?.orderPayments?.map((item, idx) => (
                  <TableRow
                    key={item.orderPaymentId}
                    onClick={(e) => {
                      e.stopPropagation();
                      setSelectedRow(item);
                    }}
                  >
                    <TableCell
                      className={itemWidth["No." as keyof typeof itemWidth]}
                    >
                      {(data?.orderPayments?.length ?? 0) - idx}
                    </TableCell>
                    <TableCell
                      className={
                        itemWidth["결제수단" as keyof typeof itemWidth]
                      }
                    >
                      {item.method === "CARD" ? "카드" : "현금"}
                    </TableCell>
                    <TableCell
                      className={
                        itemWidth["승인번호" as keyof typeof itemWidth]
                      }
                    >
                      {item.method === "CARD" && item.approvalNo?.trim()
                        ? item.approvalNo
                        : "-"}
                    </TableCell>
                    <TableCell
                      className={
                        itemWidth["현금영수증" as keyof typeof itemWidth]
                      }
                    >
                      {item.cashReceiptNo ? "발급됨" : "-"}
                    </TableCell>
                    <TableCell
                      className={itemWidth["합계" as keyof typeof itemWidth]}
                    >
                      {item.amount.toLocaleString()}원
                    </TableCell>
                    <TableCell
                      className={itemWidth["상태" as keyof typeof itemWidth]}
                    >
                      <Button
                        className="button-sm px-5 py-2"
                        color={item.state === "APPROVE" ? "approve" : "reject"}
                      >
                        {item.state === "APPROVE" ? "승인" : "취소"}
                      </Button>
                    </TableCell>
                    <TableCell
                      className={
                        itemWidth["결제시간" as keyof typeof itemWidth]
                      }
                    >
                      {item.createdAt}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            )}
            {!isLoading && data?.orderPayments.length === 0 && (
              <TableBody>해당 날짜에 결제 내역이 없습니다.</TableBody>
            )}
            {isLoading && <TableBody>결제 내역을 가져오는 중입니다.</TableBody>}
          </Table>
        </div>
      </div>
      {selectedRow && (
        <SideLayout>
          <SideSection2 {...selectedRow} />
        </SideLayout>
      )}
    </div>
  );
}
