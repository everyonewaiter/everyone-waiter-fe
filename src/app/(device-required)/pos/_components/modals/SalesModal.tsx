"use client";

import { paymentListQueries } from "@/app/(device-required)/pos/_queries/usePaymentList";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import DatePicker from "@/components/common/DatePicker";
import ModalWithTitle from "@/components/modal/largeModalLayout";
import useGetDate from "@/hooks/useGetDate";
import { useState, useEffect } from "react";

export default function SalesModal({ close }: { close: () => void }) {
  const { formattedMonth, formattedDate } = useGetDate(new Date());

  const [date, setDate] = useState<Date | null>(new Date());
  const formatted = date
    ? `${date.getFullYear()}${formattedMonth(date)}${formattedDate(date)}`
    : "";

  const { data, refetch } = paymentListQueries.useRevenueList(formatted);

  useEffect(() => {
    if (formatted) {
      refetch();
    }
    // eslint-disable-next-line
  }, [formatted]);

  return (
    <ModalWithTitle onClose={close} className="!w-fit">
      <div className="!w-[544px] bg-white">
        <DatePicker date={date} onSetDate={(d) => setDate(d)} />
        {date && (
          <div>
            {data?.totalPaymentPrice ? (
              <div className="mt-8 flex flex-col gap-10">
                <div className="flex items-center justify-between text-2xl font-semibold">
                  <h1 className="text-gray-0">
                    {formattedMonth(date)}월 {formattedDate(date)}일 매출 내역
                  </h1>
                  <span className="text-primary">
                    {data?.totalPaymentPrice.toLocaleString()}원
                  </span>
                </div>
                <div className="flex flex-col gap-5">
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-left text-xl font-semibold">주문 금액</p>
                    <div className="w-full rounded-xl border border-gray-600 px-6 py-4">
                      <div className="text-gray-0 flex items-center justify-between font-medium">
                        <span className="text-lg">주문 금액</span>
                        <span className="text-xl">
                          {data?.totalOrderPrice.toLocaleString()}원
                        </span>
                      </div>
                      <div className="text-gray-0 mt-3 flex items-center justify-between font-medium">
                        <span className="text-lg">할인</span>
                        <span className="text-xl">
                          {data?.totalDiscountPrice.toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-left text-xl font-semibold">결제 금액</p>
                    <div className="w-full rounded-xl border border-gray-600 px-6 py-4">
                      <div className="text-gray-0 flex items-center justify-between font-medium">
                        <span className="text-lg">카드</span>
                        <span className="text-xl">
                          {data?.cardPaymentApprovePrice.toLocaleString()}원
                        </span>
                      </div>
                      <div className="text-gray-0 mt-3 flex items-center justify-between font-medium">
                        <span className="text-lg">현금</span>
                        <span className="text-xl">
                          {data?.cashPaymentApprovePrice.toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="flex flex-col gap-[10px]">
                    <p className="text-left text-xl font-semibold">취소 금액</p>
                    <div className="w-full rounded-xl border border-gray-600 px-6 py-4">
                      <div className="text-gray-0 flex items-center justify-between font-medium">
                        <span className="text-lg">카드</span>
                        <span className="text-xl">
                          {data?.cardPaymentCancelPrice.toLocaleString()}원
                        </span>
                      </div>
                      <div className="text-gray-0 mt-3 flex items-center justify-between font-medium">
                        <span className="text-lg">현금</span>
                        <span className="text-xl">
                          {data?.cashPaymentCancelPrice.toLocaleString()}원
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <ResponsiveButton
                  color="grey"
                  onClick={close}
                  type="button"
                  responsiveButtons={{
                    lg: { buttonSize: "xl" },
                    md: { buttonSize: "lg" },
                    sm: { buttonSize: "md" },
                  }}
                >
                  닫기
                </ResponsiveButton>
              </div>
            ) : (
              <div className="center mt-8 h-[627px] w-full">
                <span className="text-gray-300">
                  해당 날짜의 매출 내역이 없습니다.
                </span>
              </div>
            )}
          </div>
        )}
      </div>
    </ModalWithTitle>
  );
}
