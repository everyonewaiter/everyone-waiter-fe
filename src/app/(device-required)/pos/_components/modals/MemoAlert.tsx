import Alert from "@/components/common/Alert/Alert";
import Textarea from "@/components/common/TextArea";
import { useRef, useState } from "react";
import { useMemoStore } from "../../_hooks/useMemoStore";

interface IProps {
  close: () => void;
  isOrder: boolean;
  orderNo?: number;
  onOrder?: (memo: string) => void;
  tableNo?: number;
  onUpdate?: () => void;
}

export default function MemoAlert({
  close,
  isOrder,
  onOrder,
  orderNo,
  tableNo,
  onUpdate,
}: IProps) {
  const ref = useRef<HTMLTextAreaElement>(null);
  const [isEditing, setIsEditing] = useState(false);

  const { memo, setMemo } = useMemoStore();

  const isReadonly = !isOrder && !isEditing;
  const placeholder =
    isOrder || isEditing
      ? "예약 관련 메모를 작성해주세요. (선택)"
      : "작성된 메모가 없습니다.";

  const handleAction = () => {
    if (isOrder) {
      onOrder?.(memo);
    } else if (isEditing) {
      onUpdate?.();
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

  return (
    <Alert
      onClose={close}
      buttonColor={isOrder || isEditing ? "black" : "primary"}
      noResponsive
      buttonText={getButtonText()}
      onAction={handleAction}
      hasNoCancel={isEditing}
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
