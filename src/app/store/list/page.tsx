"use client";

import { Button, ButtonColors } from "@/components/common/Button";
import Paginations from "@/components/common/Pagination/Paginations";
import useOverlay from "@/hooks/use-overlay";
import { Plus } from "lucide-react";
import { useState } from "react";
import StoreApplicationModal from "../_components/StoreApplicationModal";

const TABLE_HEADER = {
  "No.": "120px",
  신청일: "482px",
  상호명: "482.67px",
  상태: "168px",
  사유: "482.67px",
};

const STATUS_COLORS = {
  accepted: "접수",
  rejected: "반려",
  succeed: "승인",
  "re-accepted": "재접수",
};

const DUMMY_DATA: {
  id: number;
  date: number;
  store: string;
  status: ButtonColors;
  reason: string;
}[] = [
  {
    id: 1,
    date: 1712810000000,
    store: "모두의 웨이터",
    status: "rejected",
    reason: "사업자 번호 오류",
  },
  {
    id: 2,
    date: 1712810000000,
    store: "모두의 데이터2",
    status: "succeed",
    reason: "-",
  },
];

function DataCell({
  children,
  width,
}: {
  children: React.ReactNode;
  width: string;
}) {
  return (
    <div className="text-gray-0 text-center text-base" style={{ width }}>
      {children}
    </div>
  );
}

export default function StoreList() {
  const [currentPage, setCurrentPage] = useState(1);
  const { open, close } = useOverlay();

  const handleOpenModal = () => {
    open(() => <StoreApplicationModal close={close} />);
  };

  return (
    <div className="rounded-[32px] bg-white p-8 lg:min-h-[1016px] lg:w-[1800px]">
      <header className="flex h-[68px] flex-col justify-between border-b border-b-gray-500">
        <h1 className="text-gray-0 text-[28px] font-bold">매장 정보</h1>
      </header>
      <div className="my-[24px] w-full">
        <div
          className="flex h-[64px] items-center justify-center bg-gray-700"
          style={{ borderRadius: "16px" }}
        >
          {Object.keys(TABLE_HEADER).map((key) => (
            <div
              key={key}
              className="text-gray-0 text-center text-base font-bold"
              style={{ width: TABLE_HEADER[key as keyof typeof TABLE_HEADER] }}
            >
              {key}
            </div>
          ))}
        </div>
        <div>
          {/* 더미 데이터 */}
          {DUMMY_DATA.map((item) => (
            <div
              className="flex h-[64px] w-full items-center justify-center border-b border-b-gray-600"
              key={item.id}
              role="button"
              tabIndex={0}
              onClick={handleOpenModal}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  handleOpenModal();
                }
              }}
            >
              <DataCell width="120px">{item.id}</DataCell>
              <DataCell width="482px">{item.date}</DataCell>
              <DataCell width="482.67px">{item.store}</DataCell>
              <DataCell width="168px">
                <Button
                  color={item.status as ButtonColors}
                  className="font-regular h-[37px] w-[65px] text-sm"
                >
                  {STATUS_COLORS[item.status as keyof typeof STATUS_COLORS]}
                </Button>
              </DataCell>
              <DataCell width="482.67px">{item.reason}</DataCell>
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full justify-end">
        <Button
          variant="outline"
          color="outline-primary"
          className="flex h-[40px] gap-[6px]"
        >
          <Plus className="fill-primary h-4 w-4" />
          매장 추가
        </Button>
      </div>
      <Paginations
        totalPages={6}
        currentPage={currentPage}
        onSetCurrentPage={setCurrentPage}
        className="mt-8"
      />
    </div>
  );
}
