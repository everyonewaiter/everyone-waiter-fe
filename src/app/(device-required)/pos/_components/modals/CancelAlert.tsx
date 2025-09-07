import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import cn from "@/lib/utils";
import getQueryClient from "@/app/get-query-client";
import { orderQueries } from "../../_queries/useOrder";
import usePayment from "../../_queries/usePayment";
import { useOrderStore } from "../../_hooks/useOrderStore";
import { posKeys } from "../../_queries/keys";

const Alert = dynamic(() => import("@/components/common/Alert/Alert"), {
  ssr: false,
});

interface IProps {
  close: () => void;
  type: "order-cancel" | "pay-cancel" | "order-reset";
  activityData: PosTableActivity;
  hasMultiCancel?: boolean;
}

export default function CancelAlert({
  close,
  activityData,
  type,
  hasMultiCancel,
}: IProps) {
  const navigate = useRouter();
  const queryClient = getQueryClient();

  const { resetOrders } = useOrderStore();

  const cancel = orderQueries.useCancelOrder();
  const { cancelCard } = usePayment();

  const handleCancel = async () => {
    // 주문 진행중 -> 취소

    if (type === "pay-cancel") {
      // 결제 취소 (선결제)
      if (!activityData.totalPaymentPrice) return;
      cancelCard({ totalPaymentPrice: activityData.totalPaymentPrice! });
      return;
    }

    // 주문 취소 (후결제)
    const deletePromises = activityData?.orders.map((order) =>
      cancel.mutateAsync({
        orderId: order.orderId,
        tableNo: activityData?.tableNo,
      })
    );

    if (deletePromises) {
      await Promise.all(deletePromises).then(() => {
        queryClient.invalidateQueries({ queryKey: ["table-list"] });
        close();
      });
    }
  };

  // 결제 내역에서 결제 취소 시
  const handleMultiCancel = async () => {
    if (type !== "pay-cancel") return;

    const cancelPromises = activityData.orderPayments.map((payment) =>
      cancelCard({ totalPaymentPrice: payment.amount })
    );

    await Promise.all(cancelPromises);
    close();
  };

  const onAction = () => {
    if (type === "order-reset") {
      resetOrders();
      close();
      navigate.push("/pos/tables");
      queryClient.invalidateQueries({ queryKey: posKeys.tables });
      return;
    }
    if (hasMultiCancel) {
      handleMultiCancel();
    } else {
      handleCancel();
    }
  };

  return (
    <Alert
      onClose={close}
      buttonColor="primary"
      onAction={onAction}
      buttonText="취소하기"
      noResponsive
    >
      <div className="-mt-4 flex w-full flex-col gap-8">
        {type !== "order-reset" && (
          <div className="flex items-center justify-between rounded-xl border border-gray-600 px-6 py-4">
            <span className="text-2xl font-semibold">
              {activityData.tableNo}번 테이블
            </span>
            <strong className="text-primary text-3xl font-bold">
              {(type === "order-cancel"
                ? activityData?.totalOrderPrice
                : activityData?.totalPaymentPrice
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
          {type === "order-reset" ? "전체 주문을" : "결제를"} 취소하시겠습니까?
        </span>
      </div>
    </Alert>
  );
}
