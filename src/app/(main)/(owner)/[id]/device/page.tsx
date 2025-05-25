"use client";

import SectionHeader from "@/components/SectionHeader";
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
import Checkbox from "@/components/common/Checkbox";
import cn from "@/lib/utils";
import { stateTranslate } from "@/constants/translates";
import transformDate from "@/lib/formatting/transformDate";
import ResponsiveButton from "@/components/common/ResponsiveButton";
import Paginations from "@/components/common/Pagination/Paginations";
import { useState } from "react";
import useOverlay from "@/hooks/use-overlay";
import Alert from "@/components/common/Alert/Alert";
import { Button } from "@/components/common/Button";
import renderIcon from "@/app/(main)/_components/renderIcons";
import DeviceInfoModal from "./_components/DeviceInfoModal";
import useTableCheck from "./_hooks/useTableCheck";

const itemWidth = {
  이름: "flex flex-1",
  권한: "flex flex-[0.5]",
  "결제 방식": "flex flex-1",
  상태: "flex flex-[0.5]",
  "등록 일시": "flex flex-1",
};

const dummy = [
  {
    deviceId: "POS-1234",
    name: "테스트1",
    permission: "웨이팅",
    payment: null,
    status: "ACTIVE",
    createdAt: "2024-05-22 09:00:00",
  },
  {
    deviceId: "POS-1235",
    name: "테스트2",
    permission: "홀",
    payment: "선결제",
    status: "INACTIVE",
    createdAt: "2024-05-22 08:00:00",
  },
];

export default function Device() {
  const [currentPage, setCurrentPage] = useState(1);

  const { checkedItems, allChecked, handleCheckAll, handleCheckItem } =
    useTableCheck(dummy, "deviceId");

  const modalOverlay = useOverlay();
  const alertOverlay = useOverlay();

  const handleModalOpen = (deviceId: string) => {
    modalOverlay.open(() => (
      <DeviceInfoModal close={modalOverlay.close} deviceId={deviceId} />
    ));
  };

  const handleAlertOpen = () => {
    const checkedKeys = Object.keys(checkedItems);
    const { length } = checkedKeys;
    const firstItem = checkedItems[checkedKeys[0]];

    alertOverlay.open(() => (
      <Alert
        onClose={alertOverlay.close}
        onAction={() => {}}
        buttonText="삭제"
        hasNoAction={!length}
      >
        {checkedKeys.length >= 1 ? (
          <div>
            <span className="text-primary">{firstItem?.name}</span>
            {length > 1 ? ` 외 ${length - 1}개의 ` : " "}
            기기를 삭제하시겠습니까?
          </div>
        ) : (
          <span>선택되어 있는 기기가 없습니다.</span>
        )}
      </Alert>
    ));
  };

  return (
    <div className="flex h-full w-full flex-col">
      <SectionHeader title="기기 관리" />
      <button
        type="button"
        className="mt-4 mb-4 flex w-full flex-row items-center justify-end gap-1 pr-5 md:mb-0 md:pr-0 lg:mt-6 lg:mb-[-10px]"
        onClick={handleAlertOpen}
      >
        {renderIcon({
          iconKey: "trash",
          isActive: true,
          size: 20,
          className: "lg:w-5 lg:h-5 w-[15px] h-[15gpx]",
        })}
        <span className="text-status-error text-sm lg:text-lg">삭제</span>
      </button>
      <div className="hidden min-h-[calc(100dvh-420px)] w-full overflow-y-scroll md:block">
        <Table>
          <TableHeader>
            <TableRow isHead>
              <TableHead className="md:w-20 lg:!w-[66px]">
                <Checkbox
                  checked={allChecked}
                  onCheckedChange={(checked) => handleCheckAll(!!checked)}
                />
              </TableHead>
              {Object.keys(itemWidth).map((item) => (
                <TableHead
                  key={item}
                  className={cn(
                    itemWidth[item as keyof typeof itemWidth],
                    "font-semibold"
                  )}
                >
                  {item}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {dummy?.map((item) => (
              <TableRow
                key={item.deviceId}
                onClick={() => handleModalOpen(item.deviceId)}
              >
                <TableCell
                  className="md:w-20 lg:w-[66px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Checkbox
                    checked={!!checkedItems[item.deviceId]}
                    onCheckedChange={(checked) =>
                      handleCheckItem(item, !!checked)
                    }
                  />
                </TableCell>
                <TableCell className={itemWidth["이름"]}>{item.name}</TableCell>
                <TableCell className={itemWidth["권한"]}>
                  <div>
                    <ResponsiveButton
                      variant="outline"
                      color="outline-primary"
                      responsiveButtons={{
                        lg: {
                          buttonSize: "sm",
                          className:
                            "!px-5 !py-2 !rounded-[20px] text-sm font-regular",
                        },
                        md: {
                          buttonSize: "custom",
                          className: "!px-3 !py-[5px] !rounded-[16px] !h-7",
                        },
                      }}
                    >
                      {item.permission}
                    </ResponsiveButton>
                  </div>
                </TableCell>
                <TableCell className={itemWidth["결제 방식"]}>
                  {item.payment || "-"}
                </TableCell>
                <TableCell className={itemWidth["상태"]}>
                  {stateTranslate[item.status as keyof typeof stateTranslate]}
                </TableCell>
                <TableCell className={itemWidth["등록 일시"]}>
                  {transformDate(item.createdAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-5 md:hidden">
        {dummy.map((item, index) => (
          <div className="flex flex-col gap-2" key={item.deviceId}>
            <div className="text-gray-0 flex flex-row items-center gap-[10px] pl-5 text-lg font-semibold">
              <Checkbox
                checked={!!checkedItems[item.deviceId]}
                onCheckedChange={(checked) => handleCheckItem(item, !!checked)}
              />
              <span>{index + 1}</span>
            </div>
            <MobileTable
              className="z-10 mx-5"
              key={item.deviceId}
              onClick={() => handleModalOpen(item.deviceId)}
            >
              <TableBody className="flex flex-col">
                <MobileTableRow>
                  <MobileTableHead>이름</MobileTableHead>
                  <MobileTableCell>{item.name}</MobileTableCell>
                </MobileTableRow>
                <MobileTableRow>
                  <MobileTableHead>상태</MobileTableHead>
                  <MobileTableCell>
                    <Button
                      variant="outline"
                      color="outline-primary"
                      className="font-regular rounded-[24px] px-3 py-1 text-xs"
                    >
                      {item.permission}
                    </Button>
                  </MobileTableCell>
                </MobileTableRow>
                <MobileTableRow>
                  <MobileTableHead>권한</MobileTableHead>
                  <MobileTableCell>{item.permission}</MobileTableCell>
                </MobileTableRow>
                <MobileTableRow>
                  <MobileTableHead>결제 방식</MobileTableHead>
                  <MobileTableCell>{item.payment}</MobileTableCell>
                </MobileTableRow>
                <MobileTableRow>
                  <MobileTableHead>등록 일시</MobileTableHead>
                  <MobileTableCell>
                    {transformDate(item.createdAt)}
                  </MobileTableCell>
                </MobileTableRow>
              </TableBody>
            </MobileTable>
          </div>
        ))}
      </div>
      <div>
        <Paginations
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          size="lg:w-6 lg:h-6 md:w-5 md:h-5 hidden md:block"
          move={{
            fastforward: { hasMore: false },
            forward: { hasMore: false },
            backward: { hasMore: false },
            fastbackward: { hasMore: false },
          }}
        />
      </div>
    </div>
  );
}
