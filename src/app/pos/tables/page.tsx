"use client";

import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon";
import { useRouter, useSearchParams } from "next/navigation";
import useOverlay from "@/hooks/use-overlay";
import QueryProviders from "@/app/query-providers";
import Alert from "@/components/common/Alert/Alert";
import { ChevronsRight } from "lucide-react";
import TableBox from "../_components/TableBox";
import POSHeader from "../_components/POSHeader";

const dummy = [
  {
    paymentType: "POSTPAID",
    orderedMenu: ["바질 알리오올리오", "마르게리타 피자", "제로 콜라"],
    total: 74000,
    tableNo: 1,
    elapsedTime: "00:00",
    orderedTime: "00:00",
  },
  {
    paymentType: "PREPAID",
    orderedMenu: ["바질 알리오올리오", "마르게리타 피자"],
    total: 74000,
    tableNo: 2,
    elapsedTime: "00:00",
    orderedTime: "00:00",
  },
  {
    paymentType: "PREPAID",
    orderedMenu: [],
    total: 0,
    tableNo: 3,
    elapsedTime: "00:00",
    orderedTime: "00:00",
  },
  {
    paymentType: "POSTPAID",
    orderedMenu: ["바질 알리오올리오"],
    total: 74000,
    tableNo: 4,
    elapsedTime: "00:00",
    orderedTime: "00:00",
  },
];

export default function PosTables() {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const move = searchParams.get("move");

  const { open, close } = useOverlay();

  const handleChangeTable = (tableNo: number) => {
    // 원래 테이블이라면 액션 금지
    if (tableNo === 2) return;
    // 모달
    open(() => (
      <QueryProviders>
        <Alert onClose={close} buttonColor="black" buttonText="이동하기">
          <div className="flex flex-col gap-8">
            <div className="flex gap-3">
              <Button
                variant="outline"
                color="grey"
                className="text-gray-0 h-20 w-full rounded-[16px] p-6"
              >
                2번 테이블
              </Button>
              <ChevronsRight strokeWidth={1} />
              <Button
                variant="outline"
                color="primary"
                className="!text-gray-0 h-20 w-full rounded-[16px] p-6"
              >
                {tableNo}번 테이블
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-lg font-medium text-gray-100">
                2번 테이블에서{" "}
                <strong className="text-primary text-xl font-medium">
                  {tableNo}번 테이블
                </strong>
                로 이동합니다.
              </p>
              <p className="text-gray-0 text-xl font-semibold">
                좌석 이동하시겠습니까?
              </p>
            </div>
          </div>
        </Alert>
      </QueryProviders>
    ));
  };

  return (
    <div>
      <POSHeader />
      <div className="px-[60px] pt-8">
        {move && (
          <Button
            variant="outline"
            color="black"
            className="mb-6 flex h-[58px] gap-2 rounded-[24px] px-5 py-[15px]"
            onClick={() => navigate.back()}
          >
            <Icon
              iconKey="arrow-turn-right"
              size={28}
              className="text-gray-0"
            />
            <span className="font-regular text-gray-0 text-xl">
              테이블 목록으로 이동
            </span>
          </Button>
        )}
        <div className="grid grid-cols-4 gap-x-6 gap-y-8">
          {dummy.map((item) => (
            <TableBox
              key={item.tableNo}
              {...item}
              paymentType={item.paymentType as "POSTPAID" | "PREPAID"}
              isMoving={!!move}
              onClick={() => handleChangeTable(item.tableNo)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
