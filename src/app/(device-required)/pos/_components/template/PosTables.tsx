"use client";

import { ChevronsRight } from "@/components/common/Icon/index";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { deviceQueries } from "@/app/(device-required)/device/_queries/useDeviceInfo";
import QueryProviders from "@/app/query-providers";
import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon/Icon";
import useOverlay from "@/hooks/useOverlay";
import { posQueries } from "../../_queries/usePos";
import POSHeader from "../POSHeader";
import TableBox from "../TableBox";

const Alert = dynamic(() => import("@/components/common/Alert/Alert"), {
  ssr: false,
});

export default function PosTables() {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const moveSourceTableNo = searchParams.get("sourceTableNo");

  const { data: device } = deviceQueries.useDeviceDetail();

  const { open, close } = useOverlay();
  const { data, isLoading } = posQueries.useTableList(!!device?.deviceId);
  const move = posQueries.useMoveTable();

  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    if (!isLoading && data) {
      setHasLoadedOnce(true);
    }
  }, [data, isLoading]);

  const handleChangeTable = (tableNo: number) => {
    if (tableNo === Number(moveSourceTableNo)) return;

    const handleMove = () => {
      move.mutate(
        {
          sourceTableNo: Number(moveSourceTableNo),
          targetTableNo: tableNo,
        },
        {
          onSuccess: () => {
            close();
            navigate.replace(window.location.pathname);
          },
        }
      );
    };

    // 모달
    open(() => (
      <QueryProviders>
        <Alert
          onClose={close}
          buttonColor="black"
          buttonText="이동하기"
          onAction={handleMove}
        >
          <div className="flex flex-col gap-8">
            <div className="flex gap-3">
              <Button
                variant="outline"
                color="grey"
                className="text-gray-0 h-20 w-full rounded-2xl !border-gray-600 p-6"
              >
                {moveSourceTableNo}번 테이블
              </Button>
              <ChevronsRight strokeWidth={1} />
              <Button
                variant="outline"
                color="primary"
                className="!text-gray-0 h-20 w-full rounded-2xl p-6"
              >
                {tableNo}번 테이블
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-lg font-medium text-gray-100">
                {moveSourceTableNo}번 테이블에서{" "}
                <strong className="text-primary text-xl font-medium">
                  {tableNo}번 테이블
                </strong>
                로 이동합니다.
              </p>
              <p className="text-gray-0 text-xl font-semibold">
                좌석 이동하시겠습니까?
              </p>
            </div>
          </div>
        </Alert>
      </QueryProviders>
    ));
  };

  return (
    <div className="flex min-h-dvh flex-col">
      <POSHeader />
      <div className="flex flex-1 flex-col px-[60px] pt-8">
        {!!moveSourceTableNo && (
          <Button
            variant="outline"
            color="black"
            className="mb-6 flex h-[58px] !w-fit gap-2 rounded-3xl px-5 py-[15px]"
            onClick={() => navigate.back()}
          >
            <Icon
              iconKey="arrow-turn-right"
              size={28}
              className="text-gray-0"
            />
            <span className="font-regular text-gray-0 text-xl">
              테이블 상세로 이동
            </span>
          </Button>
        )}
        {hasLoadedOnce && data?.tables?.length! > 0 && (
          <div className="grid grid-cols-4 gap-x-6 gap-y-8">
            {data?.tables?.map((item) => (
              <TableBox
                key={item.tableNo}
                isMoving={!!moveSourceTableNo}
                hasAnimation={Number(moveSourceTableNo) !== item.tableNo}
                onClick={() =>
                  moveSourceTableNo
                    ? handleChangeTable(item.tableNo)
                    : navigate.push(
                        `/pos/tables/${item.tableNo}?storeId=${device?.storeId}`
                      )
                }
                {...item}
              />
            ))}
          </div>
        )}
        {!hasLoadedOnce && (
          <div className="text-gray-0 flex flex-1 items-center justify-center text-center text-2xl">
            테이블 목록을 가져오는 중입니다.
          </div>
        )}
        {hasLoadedOnce && data?.tables?.length === 0 && (
          <div className="text-gray-0 flex flex-1 items-center justify-center text-center text-2xl">
            등록된 테이블이 없습니다.
          </div>
        )}
      </div>
    </div>
  );
}
