"use client";

import Checkbox from "@/components/common/Checkbox";
import Dropdown from "@/components/common/Dropdown";
import Paginations from "@/components/common/Pagination/Paginations";
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
import Searchbar from "@/components/Searchbar";
import SectionHeader from "@/components/SectionHeader";
import { useState } from "react";
import cn from "@/lib/utils";

function DropdownGroup() {
  const [active, setActive] = useState({
    permission: "",
    subscription: "",
    storeAccepted: "",
    status: "",
  });

  return (
    <>
      <Dropdown
        data={["전체", "사장님", "사용자", "관리자"]}
        defaultText="권한"
        setActive={(value) =>
          setActive((prev) => ({ ...prev, permission: value }))
        }
        active={active.permission}
        className="ml-10"
      />
      <Dropdown
        data={["구독", "미구독", "구독철회"]}
        defaultText="구독 상태"
        setActive={(value) =>
          setActive((prev) => ({ ...prev, subscription: value }))
        }
        active={active.subscription}
      />
      <Dropdown
        data={["등록 매장", "미등록 매장"]}
        defaultText="매장 여부"
        setActive={(value) =>
          setActive((prev) => ({ ...prev, storeAccepted: value }))
        }
        active={active.storeAccepted}
      />
      <Dropdown
        data={["활성화", "비활성화"]}
        defaultText="상태"
        setActive={(value) => setActive((prev) => ({ ...prev, status: value }))}
        active={active.status}
        className="ml-10"
      />
    </>
  );
}

export default function Users() {
  const [searchWord, setSearchWord] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // const permission: TPermission = "ADMIN";

  const submitHandler = () => {};

  return (
    <div className="min-h-full w-full">
      <SectionHeader title="회원 관리" />
      <div className="mt-4 flex w-full md:hidden">
        <Searchbar
          searchWord={searchWord}
          setSearchWord={setSearchWord}
          onSubmit={submitHandler}
        />
      </div>
      <div className="px-5">
        <div className="-mx-5 mt-6 flex overflow-x-auto px-5 [-ms-overflow-style:'none'] [scrollbar-width:'none'] md:hidden [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max min-w-full items-center gap-2">
            <div className="flex items-center gap-2">
              <DropdownGroup />
            </div>
          </div>
        </div>
        <div className="mt-6 hidden items-center justify-between md:flex">
          <div className="flex gap-2">
            <DropdownGroup />
          </div>
          <div className="hidden md:flex">
            <Searchbar
              searchWord={searchWord}
              setSearchWord={setSearchWord}
              onSubmit={submitHandler}
            />
          </div>
        </div>
        <Table className="z-10 mt-[-10px] flex w-full flex-col md:mt-4">
          <TableHeader className="w-full">
            <TableRow item={null} isHead>
              <TableHead className="w-[68px]">
                <Checkbox />
              </TableHead>
              {[
                "이메일",
                "가입일시",
                "권한",
                "구독설정",
                "매장여부",
                "상태",
              ].map((item) => (
                <TableHead key={item} className="flex-1">
                  {item}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            <TableRow item={null}>
              <TableCell className="w-[64px]">
                <Checkbox />
              </TableCell>
              <TableCell className="flex-1">2</TableCell>
              <TableCell className="flex-1">3</TableCell>
              <TableCell className="flex flex-1 justify-center">
                <ResponsiveButton
                  responsiveButtons={{
                    lg: {
                      buttonSize: "md",
                      className: cn(
                        "!h-[37px] !px-5 !py-2 !rounded-[24px]",
                        "!bg-[#3900B508] !text-[#3900B5]"
                        // permission === "OWNER"
                        //   ? "bg-[#3900B508] text-[#3900B5]"
                        //   : "",
                        // permission == "USER"
                        //   ? "bg-[#00C03010] text-[#00C030]"
                        //   : "",
                        // permission === "ADMIN"
                        //   ? "bg-[#FFB70008] text-[#FFB700]"
                        //   : ""
                      ),
                    },
                  }}
                >
                  사장님
                </ResponsiveButton>
              </TableCell>
              <TableCell className="flex-1">구독중</TableCell>
              <TableCell className="flex-1">Y/N</TableCell>
              <TableCell className="flex-1">활성화</TableCell>
            </TableRow>
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
        <Paginations
          size="lg:w-6 lg:h-6 md:w-5 md:h-5 hidden md:block"
          totalPages={1}
          currentPage={currentPage}
          onSetCurrentPage={setCurrentPage}
          className="mt-8"
        />
      </div>
    </div>
  );
}
