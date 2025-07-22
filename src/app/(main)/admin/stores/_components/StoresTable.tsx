"use client";

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
import transformDate from "@/lib/formatting/transformDate";
import Button from "@/components/common/Button/Button";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { useRouter } from "next/navigation";
import cn from "@/lib/utils";
import { registerStateTranslate } from "@/constants/translates";

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
    text: "email",
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

interface IProps {
  data: AdminStores[];
}

export default function StoresTable({ data }: IProps) {
  const navigate = useRouter();

  return (
    <>
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
          {data?.map((item, idx) => (
            <TableRow
              key={item.registrationId.toString()}
              onClick={() =>
                navigate.push(
                  `/admin/stores/${item.registrationId}?email=${item.email}`,
                  { scroll: false }
                )
              }
            >
              <TableCell className={itemWidths["No."].className}>
                {idx + 1}
              </TableCell>
              <TableCell className={itemWidths.신청일.className}>
                {transformDate(item.createdAt)}
              </TableCell>
              <TableCell className={itemWidths.신청자.className}>
                {item.email}
              </TableCell>
              <TableCell className={cn(itemWidths.상호명.className)}>
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
                  {
                    registerStateTranslate[
                      item.status as keyof typeof registerStateTranslate
                    ]
                  }
                </ResponsiveButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex flex-col gap-4">
        {data?.map((item, index) => (
          <MobileTable
            className="z-10"
            key={item.registrationId.toString()}
            onClick={() =>
              navigate.push(
                `/admin/stores/${item.registrationId}?email=${item.email}`,
                { scroll: false }
              )
            }
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
                    {key === "신청자" && (
                      <MobileTableCell>
                        {item.email.length > 10
                          ? `${item.email.slice(0, 10)}...`
                          : item.email}
                      </MobileTableCell>
                    )}
                    {key === "상태" && (
                      <MobileTableCell>
                        <Button
                          color={
                            item.status.toLowerCase() as
                              | "apply"
                              | "reject"
                              | "approve"
                              | "reapply"
                          }
                          className="h-5 rounded-[6px] px-3 py-1 font-medium"
                        >
                          {
                            registerStateTranslate[
                              item.status as keyof typeof registerStateTranslate
                            ]
                          }
                        </Button>
                      </MobileTableCell>
                    )}
                    {key === "상호명" && (
                      <MobileTableCell>{item.name}</MobileTableCell>
                    )}
                  </MobileTableRow>
                ))}
            </TableBody>
          </MobileTable>
        ))}
      </div>
    </>
  );
}
