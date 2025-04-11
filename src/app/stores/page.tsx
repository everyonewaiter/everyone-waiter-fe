"use client";

import { Button } from "@/components/common/Button";
import Paginations from "@/components/common/Pagination/Paginations";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Row, { STATUS_COLORS } from "../store/_components/Row";

const TABLE_HEADER = {
  "No.": "120px",
  신청일: "482px",
  상호명: "482.67px",
  상태: "168px",
  사유: "482.67px",
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
          {DUMMY_DATA.map((item, index) => (
            <Row key={item.id} {...item} index={index} />
          ))}
        </div>
      </div>
      <div className="flex w-full justify-end">
        <Button
          variant="outline"
          color="outline-primary"
          className="flex h-[40px] gap-[6px]"
          onClick={() => navigate.push("/store/create")}
        >
          <Plus className="fill-primary h-4 w-4" />
          매장 추가
        </Button>
      </div>
      <Paginations
        totalPages={10}
        currentPage={currentPage}
        onSetCurrentPage={setCurrentPage}
        className="mt-8"
      />
    </div>
  );
}
