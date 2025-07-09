import dynamic from "next/dynamic";
import cn from "@/lib/utils";
import useOrder from "../../_queries/useOrder";
import usePos from "../../_queries/usePos";
import usePayment from "../../_queries/usePayment";
import { useOrderStore } from "../../_hooks/useOrderStore";

const Alert = dynamic(() => import("@/components/common/Alert/Alert"), {
  ssr: false,
});

interface IProps {
  close: () => void;
  tableNo: number;
  type: "order-cancel" | "pay-cancel" | "order-reset";
}

export default function CancelAlert({ close, tableNo, type }: IProps) {
  const { resetOrders } = useOrderStore();

  const { cancel } = useOrder();
  const { activity } = usePos();
  const { cancelCard } = usePayment();
  const { data } = activity(tableNo);

  return (
    <Alert
      onClose={close}
      buttonColor="primary"
      onAction={async () => {
        if (type === "pay-cancel") {
          cancelCard({ activity: data! });
        } else if (type === "order-cancel") {
          const deletePromises = data?.orders.map((order) =>
            cancel.mutateAsync({
              orderId: order.orderId,
              tableNo: data?.tableNo,
            })
          );

          if (deletePromises) {
            await Promise.all(deletePromises).then(() => close());
          }
        } else {
          resetOrders();
          close();
        }
      }}
      buttonText="취소하기"
      noResponsive
    >
      <div className="-mt-4 flex w-full flex-col gap-8">
        {type !== "order-reset" && (
          <div className="flex items-center justify-between rounded-[12px] border border-gray-600 px-6 py-4">
            <span className="text-2xl font-semibold">2번 테이블</span>
            <strong className="text-primary text-3xl font-bold">
              {(type === "order-cancel"
                ? data?.totalOrderPrice
                : data?.totalPaymentPrice
              )?.toLocaleString()}
              원
            </strong>
          </div>
        )}
        <span
          className={cn(
            "text-xl font-medium",
            type === "order-reset" ? "mt-2" : ""
          )}
        >
          {type === "pay-cancel" ? "결제를" : "전체 주문을"} 취소하시겠습니까?
        </span>
      </div>
    </Alert>
  );
}
