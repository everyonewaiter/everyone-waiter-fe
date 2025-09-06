"use client";

import { useRouter } from "next/navigation";
import { Fragment } from "react";
import dynamic from "next/dynamic";
import QueryProviders from "@/app/query-providers";
import Icon from "@/components/common/Icon/Icon";
import useOverlay from "@/hooks/useOverlay";
import useLeaveGuard from "@/hooks/useCheckLeave";
import { posQueries } from "../_queries/usePos";
import ReceiptModal from "./modals/ReceiptModal";
import MemoListAlert from "./modals/MemoListAlert";
import { useOrderStore } from "../_hooks/useOrderStore";
import usePayment from "../_queries/usePayment";

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

  const { printReceipt } = usePayment();

  const { data: activity } = posQueries.useActivity(tableNo);
  const { data: stores } = posQueries.useStoreInfo(activity?.storeId!);
  const { orders, resetOrders } = useOrderStore();
  const { checkCanLeave } = useLeaveGuard(orders.length > 0);

  const list = hasData
    ? FLOATING_ITEMS
    : FLOATING_ITEMS.filter((el) => el.label.startsWith("테이블"));

  const handleAction = (type: string) => {
    if (type === "arrow-turn-right") navigate.push("/pos/tables");
    else if (type === "rotate")
      navigate.push(`/pos/tables?sourceTableNo=${tableNo}`);
    else if (type === "book") {
      const memos = (activity?.orders ?? [])
        .map((order, index) =>
          order.memo && order.memo.trim().length > 0
            ? {
                index: index + 1,
                memo: order.memo,
                orderId: order.orderId,
                menus: order.orderMenus.map((el) => el.name),
              }
            : null
        )
        .filter(Boolean) as {
        index: number;
        memo: string;
        orderId: string;
        menus: string[];
      }[];

      open(() => (
        <QueryProviders>
          <MemoListAlert close={close} memos={memos} tableNo={tableNo} />
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
          <ReceiptModal
            close={close}
            onConfirm={() => {
              printReceipt({
                activity: activity!,
                stores: stores!,
              });
            }}
          />
        </QueryProviders>
      ));
    }
  };

  const handleClick = (icon: string) => {
    if (hasData) {
      handleAction(icon);
    } else if (!hasData && orders.length > 0) {
      checkCanLeave(() => {
        resetOrders();
        navigate.replace("/pos/tables");
      });
    } else {
      navigate.replace("/pos/tables");
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
              onClick={() => handleClick(item.icon)}
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
