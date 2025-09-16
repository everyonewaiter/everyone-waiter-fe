import dynamic from "next/dynamic";

const Alert = dynamic(() => import("@/components/common/Alert/Alert"), {
  ssr: false,
});

interface IProps {
  close: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function ReceiptOrderDetailModal({
  close,
  onConfirm,
  onCancel,
}: IProps) {
  const handleCancel = () => {
    onCancel?.();
    close();
  };

  const handleConfirm = () => {
    onConfirm();
    close();
  };

  return (
    <Alert
      onClose={close}
      noResponsive
      primaryButton={{
        text: "포함",
        onClick: handleConfirm,
      }}
      secondaryButton={{
        text: "미포함",
        color: "black",
        onClick: handleCancel,
      }}
    >
      <div className="flex flex-col gap-[6px] py-3">
        <span className="text-gray-0 text-xl font-semibold">
          영수증을 출력합니다.
        </span>
        <span className="text-lg font-medium text-gray-200">
          주문 내역을 포함하시겠습니까?
        </span>
      </div>
    </Alert>
  );
}
