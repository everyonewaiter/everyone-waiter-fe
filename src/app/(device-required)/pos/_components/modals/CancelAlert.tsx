import dynamic from "next/dynamic";
import cn from "@/lib/utils";
import getQueryClient from "@/app/get-query-client";
import { storesQueries } from "@/app/(main)/(owner)/[id]/store/_queries/useStores";
import useOverlay from "@/hooks/useOverlay";
import { orderQueries } from "../../_queries/useOrder";
import usePayment from "../../_queries/usePayment";
import { useOrderStore } from "../../_hooks/useOrderStore";
import { printRefund } from "../../_utils/print-fn/print-refund";
import ReceiptModal from "./ReceiptModal";

const Alert = dynamic(() => import("@/components/common/Alert/Alert"), {
  ssr: false,
});

interface IProps {
  close: () => void;
  type: "order-cancel" | "pay-cancel" | "order-reset";
  orderPayment?: OrderPaymentsList;
  activity: PosTableActivity;
  isFromPosTable?: boolean;
}

export default function CancelAlert({
  close,
  orderPayment,
  activity,
  type,
  isFromPosTable = false,
}: IProps) {
  const queryClient = getQueryClient();

  const { resetOrders } = useOrderStore();

  const cancel = orderQueries.useCancelOrder();
  const { cancelCard, cancelCash } = usePayment();
  const { data: stores } = storesQueries.useStoresDetail(
    orderPayment?.storeId || activity.storeId
  );

  const receiptOverlay = useOverlay();

  const handleReceiptModal = () => {
    if (!orderPayment) return;

    receiptOverlay.open(() => (
      <ReceiptModal
        close={() => {
          receiptOverlay.close();
          queryClient.invalidateQueries({ queryKey: ["payments-list"] });
        }}
        onConfirm={() => {
          printRefund({
            type:
              orderPayment.method === "CARD" ? "card-receipt" : "cash-receipt",
            activity,
            payments: orderPayment,
            stores,
            successHandler: () => {
              receiptOverlay.close();
            },
          });
        }}
      />
    ));
  };

  const handleCancel = async () => {
    // 주문 요청 직전 리스트 취소
    if (type === "order-reset") {
      resetOrders();
      return;
    }

    if (type === "pay-cancel" && !isFromPosTable) {
      // 결제 취소 (선결제)
      if (!activity.totalPaymentPrice || !orderPayment) return;
      if (orderPayment.method === "CARD") {
        cancelCard({
          orderPaymentId: orderPayment.orderPaymentId,
          totalPaymentPrice: activity.totalPaymentPrice!,
          successHandler: () => {
            close();
            handleReceiptModal();
          },
        });
      } else {
        cancelCash({
          orderPayment,
          successHandler: () => {
            close();
            handleReceiptModal();
          },
        });
      }
      return;
    }

    // 전체 주문 취소 (후결제) 및 포스 결제 취소
    if (type === "order-cancel" || (type === "pay-cancel" && isFromPosTable)) {
      const deletePromises = activity?.orders.map((order) =>
        cancel.mutateAsync({
          orderId: order.orderId,
          tableNo: activity?.tableNo,
        })
      );

      if (deletePromises) {
        await Promise.all(deletePromises).then(() => {
          if (isFromPosTable) {
            queryClient.invalidateQueries({ queryKey: ["payments-list"] });
          }
          queryClient.invalidateQueries({ queryKey: ["table-list"] });
          close();
          if (isFromPosTable) handleReceiptModal();
        });
      }
    }
  };

  return (
    <Alert
      onClose={close}
      primaryButton={{
        text: "취소하기",
        onClick: handleCancel,
      }}
      noResponsive
    >
      <div className="-mt-4 flex w-full flex-col gap-8">
        {type !== "order-reset" && (
          <div className="flex items-center justify-between rounded-xl border border-gray-600 px-6 py-4">
            <span className="text-2xl font-semibold">
              {activity.tableNo}번 테이블
            </span>
            <strong className="text-primary text-3xl font-bold">
              {(type === "order-cancel"
                ? activity?.totalOrderPrice
                : activity?.totalPaymentPrice
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
