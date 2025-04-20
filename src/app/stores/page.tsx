"use client";

import Paginations from "@/components/common/Pagination/Paginations";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import useStores from "@/hooks/useStores";
import ResponsiveButton from "@/components/common/ResponsiveButton";
import SectionHeader from "@/components/SectionHeader";
import Table from "@/components/Table";

export const TABLE_HEADER = {
  "No.": "lg:flex-[0.69] md:flex-[0.88]",
  신청일: "lg:flex-[2.78] md:flex-[1.88]",
  상호명: "lg:flex-[2.78] md:flex-[1.88]",
  상태: "lg:flex-[0.97] md:flex-[0.88]",
  사유: "lg:flex-[2.78] md:flex-[2.48]",
};

export default function StoreList() {
  const navigate = useRouter();
  const [currentPage, setCurrentPage] = useState(1);

  const { registrationList } = useStores();
  const { data } = registrationList(currentPage);

  return (
    <div className="h-full w-full overflow-y-scroll">
      <SectionHeader title="매장 등록 신청 현황" />
      <Table itemWidths={TABLE_HEADER} data={data!} />
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
        totalPages={10}
        currentPage={currentPage}
        onSetCurrentPage={setCurrentPage}
        className="mt-8"
      />
    </div>
  );
}
