"use client";

import Paginations from "@/components/common/Pagination/Paginations";
import ResponsiveButton from "@/components/common/ResponsiveButton";
import {
  MobileTable,
  MobileTableCell,
  MobileTableHead,
  MobileTableRow,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/common/Table/Tables";
import Searchbar from "@/components/Searchbar";
import SectionHeader from "@/components/SectionHeader";
import useStores from "@/hooks/useStores";
import { useState } from "react";
import cn from "@/lib/utils";
import useOverlay from "@/hooks/use-overlay";
import StoreApplicationModal from "@/app/store/_components/modals/StoreApplicationModal";
import PendingAcceptModal from "@/app/store/_components/modals/PendingAcceptModal";
import transformDate from "@/lib/formatting/transformDate";
import { STATUS_COLORS } from "@/constants/statusColor";

const itemWidths = {
  "No.": {
    className: "basis-[8.6%] md:basis-[11.7%]",
    text: "index",
  },
  신청일: {
    className: "basis-[26.5%] md:basis-[23.5%]",
    text: "createdAt",
  },
  신청자: {
    className: "basis-[26.5%] md:basis-[29.6%]",
    text: "ceoName",
  },
  상호명: {
    className: "basis-[26.5%] md:basis-[23.5%]",
    text: "name",
  },
  상태: {
    className: "basis-[12%] md:basis-[11.7%]",
    text: "status",
  },
};

export default function StoreApproval() {
  const { registrationList } = useStores();
  const { data } = registrationList(1);

  const [currentPage, setCurrentPage] = useState(1);
  const [searchWord, setSearchWord] = useState("");

  const submitHandler = () => {};

  const { open, close } = useOverlay();

  const handleOpenModal = (item: StoreDetail) => {
    if (item.status === "REJECT") {
      open(() => <StoreApplicationModal close={close} item={item} />);
    } else if (item.status === "APPLY") {
      open(() => <PendingAcceptModal close={close} />);
    }
  };

  return (
    <div className="h-full w-full">
      <SectionHeader title="매장 등록 신청 현황" />
      <div className="px-5 md:px-0">
        <div className="mt-4 flex w-full justify-end md:mt-6">
          <Searchbar
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            onSubmit={submitHandler}
          />
        </div>
        <Table className="z-10 mt-[-10px] flex w-full flex-col md:mt-4">
          <TableHeader className="w-full">
            <TableRow isHead>
              {Object.keys(itemWidths).map((item) => (
                <TableHead
                  key={item}
                  className={
                    itemWidths[item as keyof typeof itemWidths].className
                  }
                >
                  {item}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {data?.registrations.map((item, idx) => (
              <TableRow
                key={item.registrationId.toString()}
                onClick={() => handleOpenModal(item)}
              >
                <TableCell className={itemWidths["No."].className}>
                  {idx + 1}
                </TableCell>
                <TableCell className={itemWidths.신청일.className}>
                  {transformDate(item.createdAt)}
                </TableCell>
                <TableCell className={itemWidths.신청자.className}>
                  {item.ceoName}
                </TableCell>
                <TableCell className={cn(itemWidths.상호명.className)}>
                  {item.name}
                </TableCell>
                <TableCell
                  className={cn(
                    itemWidths.상태.className,
                    "flex justify-center"
                  )}
                >
                  <ResponsiveButton
                    color={item.status.toLowerCase()}
                    responsiveButtons={{
                      md: {
                        buttonSize: "custom",
                        className:
                          "h-[26px] px-4 py-1 rounded-[6px] text-xs text-white font-semibold",
                      },
                      lg: {
                        buttonSize: "custom",
                        className:
                          "h-[37px] px-5 py-2 rounded-[8px] text-sm text-white font-regular",
                      },
                    }}
                  >
                    {STATUS_COLORS[item.status]}
                  </ResponsiveButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <MobileTable className="z-10">
          <TableBody className="flex flex-col">
            <MobileTableRow>
              <MobileTableHead>No.</MobileTableHead>
              <MobileTableCell>1</MobileTableCell>
            </MobileTableRow>
            {["이메일", "가입일시", "권한", "구독설정", "매장여부", "상태"].map(
              (item) => (
                <MobileTableRow key={item}>
                  <MobileTableHead>{item}</MobileTableHead>
                  <MobileTableCell>example@email.com</MobileTableCell>
                </MobileTableRow>
              )
            )}
          </TableBody>
        </MobileTable>
      </div>
      <Paginations
        size="lg:w-6 lg:h-6 md:w-5 md:h-5 hidden md:block"
        totalPages={data?.registrationCount!}
        currentPage={currentPage}
        onSetCurrentPage={setCurrentPage}
        className="mt-8"
      />
    </div>
  );
}
