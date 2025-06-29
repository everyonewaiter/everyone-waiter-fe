"use client";

import { useEffect, useState } from "react";
import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon";
import { useRouter, useSearchParams } from "next/navigation";
import useOverlay from "@/hooks/use-overlay";
import QueryProviders from "@/app/query-providers";
import Alert from "@/components/common/Alert/Alert";
import { ChevronsRight } from "lucide-react";
import TableBox from "../_components/TableBox";
import POSHeader from "../_components/POSHeader";
import usePos from "../_queries/usePos";
import useDeviceInfo from "../../device/_queries/useDeviceInfo";

export default function PosTables() {
  const navigate = useRouter();
  const searchParams = useSearchParams();
  const move = searchParams.get("move");

  const deviceInfo = useDeviceInfo();
  const { data: device } = deviceInfo;

  const { open, close } = useOverlay();
  const { list } = usePos();
  const { data, isLoading } = list(!!device?.deviceId);

  const [hasLoadedOnce, setHasLoadedOnce] = useState(false);

  useEffect(() => {
    if (!isLoading && data) {
      setHasLoadedOnce(true);
    }
  }, [data, isLoading]);

  const handleChangeTable = (tableNo: number) => {
    // 원래 테이블이라면 액션 금지
    // 모달
    open(() => (
      <QueryProviders>
        <Alert onClose={close} buttonColor="black" buttonText="이동하기">
          <div className="flex flex-col gap-8">
            <div className="flex gap-3">
              <Button
                variant="outline"
                color="grey"
                className="text-gray-0 h-20 w-full rounded-[16px] p-6"
              >
                2번 테이블
              </Button>
              <ChevronsRight strokeWidth={1} />
              <Button
                variant="outline"
                color="primary"
                className="!text-gray-0 h-20 w-full rounded-[16px] p-6"
              >
                {tableNo}번 테이블
              </Button>
            </div>
            <div className="flex flex-col gap-3">
              <p className="text-lg font-medium text-gray-100">
                2번 테이블에서{" "}
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
    <div className="flex min-h-screen flex-col">
      <POSHeader />
      <div className="flex flex-1 flex-col px-[60px] pt-8">
        {move && (
          <Button
            variant="outline"
            color="black"
            className="mb-6 flex h-[58px] gap-2 rounded-[24px] px-5 py-[15px]"
            onClick={() => navigate.back()}
          >
            <Icon
              iconKey="arrow-turn-right"
              size={28}
              className="text-gray-0"
            />
            <span className="font-regular text-gray-0 text-xl">
              테이블 목록으로 이동
            </span>
          </Button>
        )}
        {hasLoadedOnce && data?.tables?.length! > 0 && (
          <div className="grid grid-cols-4 gap-x-6 gap-y-8">
            {data?.tables?.map((item) => (
              <TableBox
                key={item.tableNo}
                isMoving={!!move}
                onClick={() =>
                  move
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
