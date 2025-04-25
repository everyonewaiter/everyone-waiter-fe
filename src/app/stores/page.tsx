"use client";

import Paginations from "@/components/common/Pagination/Paginations";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import ResponsiveButton from "@/components/common/ResponsiveButton";
import SectionHeader from "@/components/SectionHeader";
import Table from "@/components/Table";
import useStores from "@/hooks/useStores";

const itemWidths = {
  "No.": {
    className: "lg:flex-[0.69] md:flex-[0.88]",
    text: "index",
  },
  신청일: {
    className: "lg:flex-[2.78] md:flex-[1.88]",
    text: "createdAt",
  },
  상호명: {
    className: "lg:flex-[2.78] md:flex-[1.88]",
    text: "name",
  },
  상태: {
    className: "lg:flex-[0.97] md:flex-[0.88]",
    text: "status",
  },
  사유: {
    className: "lg:flex-[2.78] md:flex-[2.48]",
    text: "reason",
  },
};

export default function StoreList() {
  const navigate = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const { registrationList } = useStores();
  const { data } = registrationList(currentPage);

  return (
    <div className="h-full max-h-screen w-full overflow-y-scroll">
      <SectionHeader title="매장 등록 신청 현황" />
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
          {data?.registrations?.map((item, idx) => (
            <Table.Row
              key={item.registrationId.toString()}
              {...item}
              index={idx + 1}
              itemWidths={itemWidths}
            />
          ))}
        </Table.RowLayout>
      </Table>
      <div className="hidden w-full justify-end md:flex">
        <ResponsiveButton
          variant="outline"
          color="outline-primary"
          onClick={() => navigate.push("/store/create")}
          responsiveButtons={{
            lg: { buttonSize: "lg" },
            md: { buttonSize: "sm" },
            sm: { buttonSize: "sm" },
          }}
        >
          <div className="flex flex-row items-center lg:gap-[6px]">
            <Plus className="fill-primary h-4 w-4" />
            <span>매장 추가</span>
          </div>
        </ResponsiveButton>
      </div>
      <Paginations
        size="lg:w-6 lg:h-6 md:w-5 md:h-5 hidden md:block"
        totalPages={Math.floor((data?.registrationCount as number) / 20)}
        currentPage={currentPage}
        onSetCurrentPage={setCurrentPage}
        className="mt-8"
      />
    </div>
  );
}
