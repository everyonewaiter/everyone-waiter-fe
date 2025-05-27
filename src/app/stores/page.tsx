"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import Paginations from "@/components/common/Pagination/Paginations";
import { Plus } from "lucide-react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ResponsiveButton from "@/components/common/ResponsiveButton";
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
import { registerStateTranslate } from "@/constants/translates";
import transformDate from "@/lib/formatting/transformDate";
import QueryProviders from "@/app/query-providers";
import useStores from "../(main)/(owner)/[id]/store/_hooks/useStores";
import StoreApplicationModal from "../(main)/(owner)/[id]/store/_components/modals/StoreApplicationModal";
import PendingAcceptModal from "../(main)/(owner)/[id]/store/_components/modals/PendingAcceptModal";

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
    if (["REJECT", "APPROVE"].includes(item.status)) {
      open(() => (
        <QueryProviders>
          <StoreApplicationModal
            close={close}
            item={item}
            isAccepted={item.status === "APPROVE"}
          />
        </QueryProviders>
      ));
    } else if (item.status === "APPLY") {
      open(() => (
        <QueryProviders>
          <PendingAcceptModal close={close} />
        </QueryProviders>
      ));
    }
  };

  useEffect(() => {
    refetch();
  }, [currentPage]);

  return (
    <div className="w-full">
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
                  {registerStateTranslate[item.status]}
                </ResponsiveButton>
              </TableCell>
              <TableCell className={itemWidths.사유.className}>
                {item.reason || "-"}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {data?.content.map((item, index) => (
        <MobileTable
          className="z-10 mx-5"
          key={item.registrationId}
          onClick={() => handleOpenModal(item)}
        >
          <TableBody className="flex flex-col">
            <MobileTableRow>
              <MobileTableHead>No.</MobileTableHead>
              <MobileTableCell>{index + 1}</MobileTableCell>
            </MobileTableRow>
            {Object.keys(itemWidths)
              .slice(1)
              .map((key) => (
                <MobileTableRow key={key}>
                  <MobileTableHead>{key}</MobileTableHead>
                  {key === "신청일" && (
                    <MobileTableCell>
                      {transformDate(item.createdAt)}
                    </MobileTableCell>
                  )}
                  {key === "상태" && (
                    <MobileTableCell>
                      <ResponsiveButton
                        color={item.status.toLowerCase()}
                        responsiveButtons={{
                          sm: {
                            buttonSize: "custom",
                            className:
                              "h-[26px] px-4 py-1 rounded-[6px] text-xs text-white font-semibold",
                          },
                        }}
                      >
                        {registerStateTranslate[item.status]}
                      </ResponsiveButton>
                    </MobileTableCell>
                  )}
                  {key !== "신청일" && key !== "상태" && (
                    <MobileTableCell>
                      {
                        item[
                          itemWidths[key as keyof typeof itemWidths]
                            .text as keyof StoreDetail
                        ]
                      }
                    </MobileTableCell>
                  )}
                </MobileTableRow>
              ))}
          </TableBody>
        </MobileTable>
      ))}
      <div className="z-10 hidden w-full justify-end md:flex">
        <ResponsiveButton
          variant="outline"
          color="outline-primary"
          onClick={() => navigate.push("/create")}
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
