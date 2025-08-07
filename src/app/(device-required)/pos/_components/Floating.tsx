"use client";

import { useRouter } from "next/navigation";
import { Fragment } from "react";
import dynamic from "next/dynamic";
import QueryProviders from "@/app/query-providers";
import Icon from "@/components/common/Icon/Icon";
import useOverlay from "@/hooks/useOverlay";
import { useDeviceContext } from "@/providers/deviceStoreProvider";
import { useMemoStore } from "../_hooks/useMemoStore";
import { useOrderStore } from "../_hooks/useOrderStore";
import { useSelectItemStore } from "../_hooks/useSelectItemStore";
import { posQueries } from "../_queries/usePos";
import ReceiptModal from "./modals/ReceiptModal";

const MemoAlert = dynamic(() => import("./modals/MemoAlert"), {
  ssr: false,
});

const ResendAlert = dynamic(() => import("./modals/ResendAlert"), {
  ssr: false,
});

const FLOATING_ITEMS = [
  {
    label: "좌석이동",
    icon: "rotate",
  },
  {
    label: "메모",
    icon: "book",
  },
  {
    label: "주방 재전송",
    icon: "send",
  },
  {
    label: "영수증 출력",
    icon: "receipt",
  },
  {
    label: "테이블 목록으로 이동",
    icon: "arrow-turn-right",
  },
];

interface IProps {
  hasData: boolean;
  tableNo: number;
}

export default function Floating({ hasData, tableNo }: IProps) {
  const navigate = useRouter();
  const { open, close } = useOverlay();

  const { data } = posQueries.useActivity(tableNo);

  const { orders } = useOrderStore();
  const { selectedOrder } = useSelectItemStore();
  const { setMemo } = useMemoStore();
  const { storeId } = useDeviceContext();

  const list = hasData
    ? FLOATING_ITEMS
    : FLOATING_ITEMS.filter((el) => el.label.startsWith("테이블"));

  const handleAction = (type: string) => {
    if (type === "arrow-turn-right") navigate.push("/pos/tables");
    else if (type === "rotate")
      navigate.push(`/pos/tables?sourceTableNo=${tableNo}`);
    else if (type === "book") {
      const orderNo = data?.orders.findIndex(
        (el) => el.orderId === selectedOrder?.orderId
      ) as number;

      if (!selectedOrder || orderNo < 0) {
        // eslint-disable-next-line  no-alert
        alert("주문 선택 시 메모를 확인할 수 있습니다.");
        return;
      }

      setMemo(selectedOrder.memo);

      open(() => (
        <QueryProviders>
          {type === "book" && selectedOrder && (
            <MemoAlert
              close={close}
              isOrder={orders.length > 0}
              orderNo={orderNo + 1}
              tableNo={tableNo}
            />
          )}
        </QueryProviders>
      ));
    } else if (type === "send") {
      open(() => (
        <QueryProviders>
          <ResendAlert close={close} tableNo={tableNo} />
        </QueryProviders>
      ));
    } else {
      open(() => (
        <QueryProviders>
          <ReceiptModal close={close} tableNo={tableNo} storeId={storeId!} />
        </QueryProviders>
      ));
    }
  };

  return (
    <aside className="shadow-floating font-regular text-gray-0 absolute bottom-7 left-1/2 flex h-[76px] -translate-x-1/2 flex-row rounded-[40px] bg-white px-10 py-6 text-xl">
      {Array.isArray(list) &&
        list?.map((item, index, arr) => (
          <Fragment key={item.label}>
            <button
              type="button"
              className="inline-flex items-center gap-2 whitespace-nowrap"
              onClick={() => handleAction(item.icon)}
            >
              <Icon iconKey={item.icon} className="text-gray-0" />
              <span>{item.label}</span>
            </button>
            {index < arr.length - 1 && (
              <div className="mx-5 mt-1.5 h-5 w-px bg-gray-600" />
            )}
          </Fragment>
        ))}
    </aside>
  );
}
