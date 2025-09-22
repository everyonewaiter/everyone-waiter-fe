import { useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import getQueryClient from "@/app/get-query-client";
import Textarea from "@/components/common/TextArea";
import { ButtonColors } from "@/components/common/Button/Button";
import { useOrderStore } from "../../_hooks/useOrderStore";
import { orderQueries } from "../../_queries/useOrder";
import { posKeys } from "../../_queries/keys";

const Alert = dynamic(() => import("@/components/common/Alert/Alert"), {
  ssr: false,
});

interface IProps {
  close: () => void;
  isOrder: boolean;
  tableNo?: number;
}

export default function MemoAlert({ close, isOrder, tableNo }: IProps) {
  const navigate = useRouter();

  const [isSubmitted, setIsSubmitted] = useState(false);
  const [memo, setMemo] = useState("");

  const { orders, resetOrders } = useOrderStore();

  const order = orderQueries.useOrderMenu();

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
          const queryClient = getQueryClient();

          resetOrders();
          setMemo("");
          close();

          navigate.push("/pos/tables");
          queryClient.invalidateQueries({ queryKey: posKeys.tables });
        },
        onError: () => setIsSubmitted(false),
      }
    );
  };

  const handleAction = () => {
    setIsSubmitted(true);
    handleOrder();
  };

  return (
    <Alert
      onClose={close}
      noResponsive
      isSubmitted={isSubmitted}
      primaryButton={{
        text: "주문하기",
        color: (isOrder ? "black" : "primary") as ButtonColors,
        onClick: handleAction,
      }}
    >
      <div className="-mt-4 flex w-full flex-col gap-5">
        <h3 className="text-xl font-semibold">주문하시겠습니까?</h3>
        <Textarea
          className="h-[120px]"
          placeholder="예약 관련 메모를 작성해주세요. (선택)"
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          readOnly={!isOrder}
        />
      </div>
    </Alert>
  );
}
