"use client";

import { useRouter } from "next/navigation";
import Checkbox from "@/components/common/Checkbox";
import {
  MobileTable,
  MobileTableCell,
  MobileTableHead,
  MobileTableRow,
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/common/Table/Tables";
import { permissionTranslate, stateTranslate } from "@/constants/translates";
import UsersTableRow from "./UsersTableRow";

interface IProps {
  data: AdminAccount[];
}

export default function UsersTable({ data }: IProps) {
  const navigate = useRouter();

  return (
    <>
      <Table className="z-10 mt-[-10px] flex w-full flex-col md:mt-4">
        <TableHeader className="w-full">
          <TableRow isHead>
            <TableHead className="md:w-[64px] lg:w-[68px]">
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
            <UsersTableRow
              key={item.accountId.toString()}
              {...item}
              openModal={() => navigate.push(`/admin/users/${item.accountId}`)}
            />
          ))}
        </TableBody>
      </Table>
      <div className="flex w-full flex-col gap-5 md:hidden">
        {data?.map((item, idx) => (
          <MobileTable
            key={item.accountId}
            className="z-10"
            onClick={() => navigate.push(`/admin/users/${item.accountId}`)}
          >
            <TableBody className="flex flex-col">
              <MobileTableRow>
                <MobileTableHead>No.</MobileTableHead>
                <MobileTableCell>{idx + 1}</MobileTableCell>
              </MobileTableRow>
              <MobileTableRow>
                <MobileTableHead>이메일</MobileTableHead>
                <MobileTableCell>
                  {item.email?.length > 10
                    ? `${item.email.slice(0, 10)}...`
                    : item.email}
                </MobileTableCell>
              </MobileTableRow>
              <MobileTableRow>
                <MobileTableHead>가입일시</MobileTableHead>
                <MobileTableCell>{item.createdAt}</MobileTableCell>
              </MobileTableRow>
              <MobileTableRow>
                <MobileTableHead>권한</MobileTableHead>
                <MobileTableCell>
                  {permissionTranslate[item.permission]}
                </MobileTableCell>
              </MobileTableRow>
              <MobileTableRow>
                <MobileTableHead>매장 여부</MobileTableHead>
                <MobileTableCell>{item.hasStore}</MobileTableCell>
              </MobileTableRow>
              <MobileTableRow>
                <MobileTableHead>상태</MobileTableHead>
                <MobileTableCell hideBorder>
                  {stateTranslate[item.state]}
                </MobileTableCell>
              </MobileTableRow>
            </TableBody>
          </MobileTable>
        ))}
      </div>
    </>
  );
}
