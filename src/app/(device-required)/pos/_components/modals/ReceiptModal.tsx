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
      onAction={handleConfirm}
      onCancel={handleCancel}
      onClose={close}
      buttonText="출력하기"
      buttonColor="black"
      noResponsive
    >
      <strong className="text-gray-0 text-xl font-semibold">
        영수증을 출력하시겠습니까?
      </strong>
    </Alert>
  );
}
