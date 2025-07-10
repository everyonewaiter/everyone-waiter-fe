import { useRef, useState } from "react";
import dynamic from "next/dynamic";
import Textarea from "@/components/common/TextArea";
import { useMemoStore } from "../../_hooks/useMemoStore";
import { useOrderStore } from "../../_hooks/useOrderStore";
import { useSelectItemStore } from "../../_hooks/useSelectItemStore";
import useOrder from "../../_queries/useOrder";

const Alert = dynamic(() => import("@/components/common/Alert/Alert"), {
  ssr: false,
});

interface IProps {
  close: () => void;
  isOrder: boolean;
  orderNo?: number;
  tableNo?: number;
}

export default function MemoAlert({
  close,
  isOrder,
  orderNo,
  tableNo,
}: IProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { memo, setMemo, resetMemo } = useMemoStore();
  const { selectedOrder, setSelectedOrder } = useSelectItemStore();
  const { orders, resetOrders } = useOrderStore();

  const { memoUpdate, order } = useOrder();

  const isReadonly = !isOrder && !isEditing;
  const placeholder =
    isOrder || isEditing
      ? "예약 관련 메모를 작성해주세요. (선택)"
      : "작성된 메모가 없습니다.";

  const handleOrder = () => {
    order.mutate(
      {
        tableNo: Number(tableNo),
        memo,
        orderMenus: orders.map((el) => ({
          ...el,
          menuOptionGroups: el.menuOptionGroups.map((g) => ({
            menuOptionGroupId: g.orderOptionGroupId,
            orderOptions: g.orderOptions,
          })),
        })),
      },
      {
        onSuccess: () => {
          resetOrders();
          resetMemo();
          close();
        },
      }
    );
  };

  const handleUpdateMemo = () => {
    memoUpdate.mutate(
      {
        tableNo: Number(tableNo),
        orderId: selectedOrder?.orderId as string,
        body: { memo },
      },
      {
        onSuccess: () => {
          setSelectedOrder(null);
          resetMemo();
          close();
        },
      }
    );
  };

  const handleAction = () => {
    if (isOrder) {
      handleOrder();
    } else if (isEditing) {
      handleUpdateMemo();
    } else {
      setIsEditing(true);
      ref.current?.focus();
      ref.current?.setSelectionRange(memo.length, memo.length);
    }
  };

  const getButtonText = () => {
    if (isOrder) return "주문하기";
    return isEditing ? "저장하기" : "수정하기";
  };

  const alertProps = {
    onClose: close,
    buttonColor: isOrder || isEditing ? "black" : "primary",
    noResponsive: true,
    buttonText: getButtonText(),
    onAction: handleAction,
    hasNoCancel: isEditing,
  };

  return (
    <Alert {...alertProps}>
      <div className="-mt-4 flex w-full flex-col gap-5">
        {isOrder ? (
          <h3 className="text-xl font-semibold">주문하시겠습니까?</h3>
        ) : (
          <div className="flex items-center justify-between">
            <h3 className="text-2xl font-semibold">메모</h3>
            <span className="text-lg font-semibold">
              {orderNo ? `${orderNo}번 주문` : `${tableNo}번 테이블`}
            </span>
          </div>
        )}
        <Textarea
          ref={ref}
          className="h-[120px]"
          placeholder={placeholder}
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          readOnly={isReadonly}
        />
      </div>
    </Alert>
  );
}
