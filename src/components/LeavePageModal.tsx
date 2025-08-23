import Alert from "./common/Alert/Alert";

interface IProps {
  onAction: () => void;
  onCancel: () => void;
  close: () => void;
}

export default function LeavePageModal({ onAction, onCancel, close }: IProps) {
  return (
    <Alert
      onClose={close}
      buttonText="뒤로가기"
      cancelText="닫기"
      buttonColor="black"
      onAction={onAction}
      onCancel={onCancel}
      customButtonStyle="w-full !button-lg"
    >
      <div className="flex flex-col gap-2 py-3">
        <span className="text-primary text-xl font-semibold">
          현재 저장되지 않은 주문 내역이 있습니다.
        </span>
        <span className="text-gray-0 text-lg font-medium">
          저장하지 않고 목록으로 이동하시겠습니까?
        </span>
      </div>
    </Alert>
  );
}
