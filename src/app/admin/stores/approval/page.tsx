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
import { useEffect, useState } from "react";
import cn from "@/lib/utils";
import useOverlay from "@/hooks/use-overlay";
import transformDate from "@/lib/formatting/transformDate";
import useAdmin from "@/app/admin/_hooks/useAdmin";
import Dropdown from "@/components/common/Dropdown";
import Checkbox from "@/components/common/Checkbox";
import useDebounce from "@/hooks/useDebounce";
import { registerStatusObj } from "@/constants/permissionObj";
import { Button } from "@/components/common/Button";
import QueryProviders from "@/app/query-providers";
import StoreModal from "../../_components/StoreModal";

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

export default function StoreApproval() {
  const [currentPage, setCurrentPage] = useState(1);
  const [searchWord, setSearchWord] = useState("");
  const [active, setActive] = useState({
    status: "",
  });
  const [isChecked, setIsChecked] = useState(false);

  const { debouncedValue } = useDebounce({ searchWord, delay: 300 });
  const { adminStoresListQuery } = useAdmin();
  const { data, refetch } = adminStoresListQuery(
    isChecked ? "" : debouncedValue,
    isChecked ? debouncedValue : "",
    active.status === "전체"
      ? null
      : (Object.keys(registerStatusObj).find(
          (key) => registerStatusObj[key as RegisterStatus] === active.status
        ) as RegisterStatus),
    currentPage
  );

  const submitHandler = () => {};

  const { open, close } = useOverlay();

  const handleOpenModal = (registrationId: bigint, email: string) => {
    open(() => (
      <QueryProviders>
        <StoreModal
          close={close}
          registrationId={registrationId}
          email={email}
        />
      </QueryProviders>
    ));
  };

  useEffect(() => {
    refetch();
  }, [active.status, debouncedValue]);

  return (
    <div className="h-full w-full">
      <SectionHeader title="매장 등록 신청 현황" />
      <div className="px-5 md:px-0">
        <div className="mt-4 flex items-center gap-2 md:hidden">
          <Searchbar
            searchWord={searchWord}
            setSearchWord={setSearchWord}
            onSubmit={submitHandler}
            placeholder={
              isChecked
                ? "매장명을 입력해주세요"
                : "신청자 이메일을 입력해주세요"
            }
          />
        </div>
        <div className="mt-4 flex items-center justify-between md:mt-6">
          <div className="flex w-full items-center justify-between gap-2">
            <Dropdown
              data={["전체", "접수", "재접수", "승인", "반려"]}
              defaultText="상태"
              active={active.status}
              setActive={(value) =>
                setActive((prev) => ({ ...prev, status: value }))
              }
              triggerClassName="lg:!text-base"
              className="lg:!text-base"
            />
            <div
              className={cn(
                "flex items-center gap-2 text-xs md:hidden",
                isChecked ? "text-gray-100" : "text-gray-300"
              )}
            >
              매장 검색
              <Checkbox
                checked={isChecked}
                onClick={() => setIsChecked((prev) => !prev)}
              />
            </div>
          </div>
          <div className="hidden items-center justify-end gap-2 md:flex">
            <div
              className={cn(
                "flex flex-shrink-0 items-center gap-2 text-xs lg:text-base",
                isChecked ? "text-gray-100" : "text-gray-300"
              )}
            >
              매장 검색
              <Checkbox
                checked={isChecked}
                onClick={() => setIsChecked((prev) => !prev)}
              />
            </div>
            <Searchbar
              searchWord={searchWord}
              setSearchWord={setSearchWord}
              onSubmit={submitHandler}
              placeholder={
                isChecked
                  ? "매장명을 입력해주세요"
                  : "신청자 이메일을 입력해주세요"
              }
              className="md:text-s w-full lg:!w-[280px] lg:text-base"
            />
          </div>
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
            {data?.content?.map((item, idx) => (
              <TableRow
                key={item.registrationId.toString()}
                onClick={() => handleOpenModal(item.registrationId, item.email)}
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
                    {registerStatusObj[item.status]}
                  </ResponsiveButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        <div className="flex flex-col gap-4">
          {data?.content?.map((item, index) => (
            <MobileTable
              className="z-10"
              key={item.registrationId.toString()}
              onClick={() => handleOpenModal(item.registrationId, item.email)}
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
                            {registerStatusObj[item.status]}
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
      </div>
      <Paginations
        size="lg:w-6 lg:h-6 md:w-5 md:h-5 hidden md:block"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        className="mt-8"
        move={{
          fastbackward: {
            hasMore: data?.hasPrevious!,
            target: data?.fastBackwardPage!,
          },
          backward: { hasMore: data?.hasPrevious! },
          forward: { hasMore: data?.hasNext! },
          fastforward: {
            hasMore: data?.hasNext!,
            target: data?.fastForwardPage!,
          },
        }}
      />
    </div>
  );
}
