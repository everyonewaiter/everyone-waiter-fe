"use client";

import { useParams, useRouter } from "next/navigation";
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
import {
  deviceTranslate,
  paymentTimeTranslate,
  stateTranslate,
} from "@/constants/translates";
import transformDate from "@/lib/formatting/transformDate";
import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Paginations from "@/components/common/Pagination/Paginations";
import { useState } from "react";
import useOverlay from "@/hooks/use-overlay";
import Alert from "@/components/common/Alert/Alert";
import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon";
import getQueryClient from "@/app/get-query-client";
import useTableCheck from "./_hooks/useTableCheck";
import useDevice from "./_hooks/useDevice";

const itemWidth = {
  이름: "flex flex-1",
  권한: "flex flex-[0.5]",
  "결제 방식": "flex flex-1",
  상태: "flex flex-[0.5]",
  "등록 일시": "flex flex-1",
};

export default function Device() {
  const queryClient = getQueryClient();
  const params = useParams();
  const storeId = params?.id as string;

  const navigate = useRouter();

  const [currentPage, setCurrentPage] = useState(1);

  const { getDevicesQuery, mutateDeleteDevice } = useDevice();
  const { data } = getDevicesQuery(storeId);

  const { checkedItems, allChecked, handleCheckAll, handleCheckItem } =
    useTableCheck<Device>(data?.content!, "deviceId");

  const alertOverlay = useOverlay();

  const handleDeleteDevice = () => {
    const deletePromises = Object.keys(checkedItems).map((deviceId) =>
      mutateDeleteDevice.mutateAsync({
        deviceId,
        storeId,
      })
    );

    Promise.all(deletePromises).then(() => {
      queryClient.invalidateQueries({ queryKey: ["get-devices"] });
    });
    alertOverlay.close();
  };

  const handleAlertOpen = () => {
    const checkedKeys = Object.keys(checkedItems);
    const { length } = checkedKeys;
    const firstItem = checkedItems[checkedKeys[0]];

    alertOverlay.open(() => (
      <Alert
        onClose={alertOverlay.close}
        onAction={handleDeleteDevice}
        buttonText="삭제"
        hasNoAction={!length}
      >
        {checkedKeys.length >= 1 ? (
          <div>
            <span className="text-primary">{firstItem?.deviceId}</span>
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
      <button
        type="button"
        className="mt-4 mb-4 flex w-full flex-row items-center justify-end gap-1 md:mb-0 lg:mt-6 lg:mb-[-10px]"
        onClick={handleAlertOpen}
      >
        <Icon
          iconKey="trash"
          isActive
          size={20}
          className="h-[15gpx] w-[15px] lg:h-5 lg:w-5"
        />
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
            {data?.content?.map((item: Device) => (
              <TableRow
                key={item.deviceId.toString()}
                onClick={() =>
                  navigate.push(`/${storeId}/device/${item.deviceId}`)
                }
              >
                <TableCell
                  className="md:w-20 lg:w-[66px]"
                  onClick={(e) => e.stopPropagation()}
                >
                  <Checkbox
                    checked={!!checkedItems[item.deviceId.toString()]}
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
                      color="primary"
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
                      {item.purpose}
                    </ResponsiveButton>
                  </div>
                </TableCell>
                <TableCell className={itemWidth["결제 방식"]}>
                  {item.paymentType || "-"}
                </TableCell>
                <TableCell className={itemWidth["상태"]}>
                  {stateTranslate[item.state as Status]}
                </TableCell>
                <TableCell className={itemWidth["등록 일시"]}>
                  {transformDate(item.updatedAt)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div className="flex flex-col gap-5 md:hidden">
        {data?.content.map((item: Device, index: number) => (
          <div className="flex flex-col gap-2" key={item.deviceId}>
            <div className="text-gray-0 flex flex-row items-center gap-[10px] text-lg font-semibold">
              <Checkbox
                checked={!!checkedItems[item.deviceId.toString()]}
                onCheckedChange={(checked) => handleCheckItem(item, !!checked)}
              />
              <span>{index + 1}</span>
            </div>
            <MobileTable
              className="z-10"
              key={item.deviceId}
              // onClick={() => handleModalOpen(item.deviceId)}
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
                      color="primary"
                      className="font-regular rounded-[24px] px-3 py-1 text-xs"
                    >
                      {
                        stateTranslate[
                          item.state as keyof typeof stateTranslate
                        ]
                      }
                    </Button>
                  </MobileTableCell>
                </MobileTableRow>
                <MobileTableRow>
                  <MobileTableHead>권한</MobileTableHead>
                  <MobileTableCell>
                    {
                      deviceTranslate[
                        item.purpose as keyof typeof deviceTranslate
                      ]
                    }
                  </MobileTableCell>
                </MobileTableRow>
                <MobileTableRow>
                  <MobileTableHead>결제 방식</MobileTableHead>
                  <MobileTableCell>
                    {
                      paymentTimeTranslate[
                        item.paymentType as keyof typeof paymentTimeTranslate
                      ]
                    }
                  </MobileTableCell>
                </MobileTableRow>
                <MobileTableRow>
                  <MobileTableHead>등록 일시</MobileTableHead>
                  <MobileTableCell>
                    {transformDate(item.updatedAt)}
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
