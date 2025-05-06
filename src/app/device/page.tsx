"use client";

import SectionHeader from "@/components/SectionHeader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/Table/Tables";
import Checkbox from "@/components/common/Checkbox";
import cn from "@/lib/utils";
import { stateObj } from "@/constants/permissionObj";
import transformDate from "@/lib/formatting/transformDate";
import ResponsiveButton from "@/components/common/ResponsiveButton";
import Paginations from "@/components/common/Pagination/Paginations";
import { useState } from "react";
import renderIcon from "../(main)/_components/renderIcons";

const dummy = [
  {
    deviceId: "POS-1234",
    name: "테스트1",
    permission: "웨이팅",
    payment: null,
    status: "ACTIVE",
    createdAt: "2024-05-22 09:00:00",
  },
  {
    deviceId: "POS-1235",
    name: "테스트2",
    permission: "홀",
    payment: "선결제",
    status: "INACTIVE",
    createdAt: "2024-05-22 08:00:00",
  },
];

export default function Device() {
  const [currentPage, setCurrentPage] = useState(1);

  return (
    <div className="h-full w-full">
      <SectionHeader title="기기 관리" />
      <button
        type="button"
        className="float-right mt-6 mb-[-10px] flex flex-row items-center gap-1"
      >
        {renderIcon({ iconKey: "trash", isActive: true, size: 20 })}
        <span className="text-status-error text-lg">삭제</span>
      </button>
      <div className="min-h-[calc(100dvh-420px)] w-full overflow-y-scroll">
        <Table>
          <TableHeader>
            <TableRow isHead>
              <TableHead className="!w-[66px]">
                <Checkbox />
              </TableHead>
              {["이름", "권한", "결제 방식", "상태", "등록 일시"].map(
                (item, index) => (
                  <TableHead
                    key={item}
                    className={cn(
                      index % 2 === 0 ? "flex flex-1" : "flex flex-[0.5]",
                      "font-semibold"
                    )}
                  >
                    {item}
                  </TableHead>
                )
              )}
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummy?.map((item) => (
              <TableRow key={item.deviceId}>
                <TableCell className="lg:w-[66px]">
                  <Checkbox />
                </TableCell>
                <TableCell className="flex flex-1">{item.name}</TableCell>
                <TableCell className="flex flex-[0.5]">
                  <div>
                    <ResponsiveButton
                      variant="outline"
                      color="outline-primary"
                      responsiveButtons={{
                        lg: {
                          buttonSize: "sm",
                          className:
                            "!px-5 !py-2 !rounded-[20px] text-sm font-regular",
                        },
                      }}
                    >
                      {item.permission}
                    </ResponsiveButton>
                  </div>
                </TableCell>
                <TableCell className="flex flex-1">
                  {item.payment || "-"}
                </TableCell>
                <TableCell className="flex flex-[0.5]">
                  {stateObj[item.status as keyof typeof stateObj]}
                </TableCell>
                <TableCell className="flex flex-1">
                  {transformDate(item.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="mt-10">
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
