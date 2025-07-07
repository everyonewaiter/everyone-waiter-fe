import Alert from "@/components/common/Alert/Alert";
import useOrder from "../../_queries/useOrder";
import { useOrderStore } from "../../_hooks/useOrderStore";

interface IProps {
  close: () => void;
  tableNo: number;
  orderId: string;
  type: "order-cancel" | "pay-cancel";
}

export default function CancelAlert({ close, tableNo, orderId, type }: IProps) {
  const { cancel } = useOrder();

  const { resetOrders } = useOrderStore();

  return (
    <Alert
      onClose={close}
      buttonColor="primary"
      onAction={() => {
        if (type === "pay-cancel") {
          cancel.mutate({ orderId, tableNo });
        } else {
          resetOrders();
        }
      }}
      buttonText="취소하기"
      noResponsive
    >
      <div className="-mt-4 flex w-full flex-col gap-8">
        {type === "pay-cancel" && (
          <div className="flex items-center justify-between rounded-[12px] border border-gray-600 px-6 py-4">
            <span className="text-2xl font-semibold">2번 테이블</span>
            <strong className="text-primary text-3xl font-bold">
              {(72000).toLocaleString()}원
            </strong>
          </div>
        )}
        <span className="text-xl font-medium">
          {type === "pay-cancel" ? "결제를" : "주문을"} 취소하시겠습니까?
        </span>
      </div>
    </Alert>
  );
}
