import Alert from "@/components/common/Alert/Alert";
import Textarea from "@/components/common/TextArea";
import { useMemoStore } from "../../_hooks/useMemoStore";

interface IProps {
  close: () => void;
  isOrder: boolean;
  orderNo?: number;
  onOrder?: (memo: string) => void;
  tableNo?: number;
}

export default function MemoAlert({
  close,
  isOrder,
  onOrder,
  orderNo,
  tableNo,
}: IProps) {
  const { memo, setMemo } = useMemoStore();

  return (
    <Alert
      onClose={close}
      buttonColor="black"
      noResponsive
      buttonText="주문하기"
      hasNoAction={!isOrder}
      onAction={() => onOrder?.(memo)}
    >
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
          className="h-[120px]"
          placeholder={
            isOrder
              ? "예약 관련 메모를 작성해주세요. (선택)"
              : "작성된 메모가 없습니다."
          }
          value={memo}
          onChange={(e) => setMemo(e.target.value)}
          readOnly={!isOrder}
        />
      </div>
    </Alert>
  );
}
