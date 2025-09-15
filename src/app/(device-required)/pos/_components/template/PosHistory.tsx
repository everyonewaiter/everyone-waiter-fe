"use client";

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
import { paymentListQueries } from "../../_queries/usePaymentList";
import SideLayout from "../SideSection/SideLayout";
import SideSection2 from "../SideSection2";
import POSHeader2 from "../POSHeader2";

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

export default function PosHistory() {
  const now = new Date();
  const { formattedMonth, formattedDate } = useGetDate(now);

  const [selectedRow, setSelectedRow] = useState<OrderPaymentsList | null>(
    null
  );
  const [date, setDate] = useState<Date | null>(now);
  const formatted = date
    ? `${date.getFullYear()}${formattedMonth(date)}${formattedDate(date)}`
    : "";

  const { data, refetch, isLoading } =
    paymentListQueries.usePaymentsList(formatted);

  console.log(
    !!data?.orderPayments?.filter(
      (el) => el.posTableActivityId === selectedRow?.posTableActivityId
    )
  );

  useEffect(() => {
    refetch();
  }, [formatted, refetch]);

  return (
    <div className="flex h-dvh w-full flex-col">
      <POSHeader2 />
      <div className="flex h-full w-full">
        <div className="relative flex w-full flex-1 flex-col px-[60px] pt-8 pb-6">
          <DatePicker
            date={date}
            onSetDate={(d) => {
              setDate(d);
              setSelectedRow(null);
            }}
          />
          <div className="h-[calc(100dvh-300px)]">
            <Table className="mt-6 w-full overflow-hidden">
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
              {!isLoading && (data?.orderPayments?.length ?? 0) > 0 && (
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
                          color={
                            item.state === "APPROVE" ? "approve" : "reject"
                          }
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
              {!isLoading && (data?.orderPayments?.length ?? 0) === 0 && (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center">
                      해당 날짜에 결제 내역이 없습니다.
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
              {isLoading && (
                <TableBody>
                  <TableRow>
                    <TableCell colSpan={7} className="py-10 text-center">
                      결제 내역을 가져오는 중입니다.
                    </TableCell>
                  </TableRow>
                </TableBody>
              )}
            </Table>
          </div>
        </div>
        {selectedRow && (
          <SideLayout>
            <SideSection2
              resetSelectedRow={() => setSelectedRow(null)}
              isCancelled={
                data?.orderPayments?.find(
                  (el) =>
                    el.posTableActivityId === selectedRow?.posTableActivityId &&
                    el.orderPaymentId === selectedRow?.orderPaymentId
                )?.state === "CANCEL"
              }
              {...selectedRow}
            />
          </SideLayout>
        )}
      </div>
    </div>
  );
}
