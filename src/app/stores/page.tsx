"use client";

import Paginations from "@/components/common/Pagination/Paginations";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ResponsiveButton from "@/components/common/ResponsiveButton";
import SectionHeader from "@/components/SectionHeader";
import useStores from "@/hooks/useStores";
import {
  MobileTable,
  MobileTableCell,
  MobileTableHead,
  MobileTableRow,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/Table/Tables";
import cn from "@/lib/utils";
import useOverlay from "@/hooks/use-overlay";
import { STATUS_COLORS } from "@/constants/statusColor";
import transformDate from "@/lib/formatting/transformDate";
import StoreApplicationModal from "../store/_components/modals/StoreApplicationModal";
import PendingAcceptModal from "../store/_components/modals/PendingAcceptModal";

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

  const { registrationListQuery } = useStores();
  const { data, refetch } = registrationListQuery(currentPage);

  const { open, close } = useOverlay();

  const handleOpenModal = (item: StoreDetail) => {
    if (item.status === "REJECT") {
      open(() => <StoreApplicationModal close={close} item={item} />);
    } else if (item.status === "APPLY") {
      open(() => <PendingAcceptModal close={close} />);
    }
  };

  useEffect(() => {
    refetch();
  }, [currentPage]);

  return (
    <div className="h-full max-h-screen w-full overflow-y-scroll">
      <SectionHeader title="매장 등록 신청 현황" />
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
          {data?.content?.map((item, idx) => (
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
              <TableCell className={itemWidths.상호명.className}>
                {item.name}
              </TableCell>
              <TableCell
                className={cn(itemWidths.상태.className, "flex justify-center")}
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
              <TableCell className={itemWidths.사유.className}>
                {item.reason || "-"}
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
      <div className="z-10 hidden w-full justify-end md:flex">
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
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        move={{
          fastforward: {
            hasMore: data?.hasNext!,
            target: data?.fastForwardPage!,
          },
          forward: {
            hasMore: data?.hasNext!,
          },
          backward: {
            hasMore: data?.hasPrevious!,
          },
          fastbackward: {
            hasMore: data?.hasPrevious!,
            target: data?.fastBackwardPage!,
          },
        }}
        className="mt-8"
      />
    </div>
  );
}
