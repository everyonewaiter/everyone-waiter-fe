"use client";

import {
  MobileTable,
  MobileTableCell,
  MobileTableHead,
  MobileTableRow,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
  Table,
} from "@/components/common/Table/Tables";
import Checkbox from "@/components/common/Checkbox";
import UsersTableRow from "./UsersTableRow";

interface IProps {
  data: AdminAccount[];
}

export default function UsersTable({ data }: IProps) {
  return (
    <>
      <Table className="z-10 mt-[-10px] flex w-full flex-col md:mt-4">
        <TableHeader className="w-full">
          <TableRow isHead>
            <TableHead className="w-[68px]">
              <Checkbox />
            </TableHead>
            {["이메일", "가입일시", "권한", "구독설정", "매장여부", "상태"].map(
              (item) => (
                <TableHead
                  key={item}
                  className={item === "이메일" ? "flex-[1.3]" : "flex-1"}
                >
                  {item}
                </TableHead>
              )
            )}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.map((item) => (
            <UsersTableRow key={item.accountId.toString()} {...item} />
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
    </>
  );
}
