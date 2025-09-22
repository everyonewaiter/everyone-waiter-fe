import dynamic from "next/dynamic";

const Alert = dynamic(() => import("@/components/common/Alert/Alert"), {
  ssr: false,
});

interface IProps {
  close: () => void;
  onConfirm: () => void;
  onCancel?: () => void;
}

export default function ReceiptModal({ close, onConfirm, onCancel }: IProps) {
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
      primaryButton={{
        text: "출력하기",
        color: "black",
        onClick: handleConfirm,
      }}
      secondaryButton={{
        text: "닫기",
        onClick: handleCancel,
      }}
      noResponsive
    >
      <strong className="text-gray-0 text-xl font-semibold">
        영수증을 출력하시겠습니까?
      </strong>
    </Alert>
  );
}
