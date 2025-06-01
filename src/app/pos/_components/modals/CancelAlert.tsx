import Alert from "@/components/common/Alert/Alert";

interface IProps {
  close: () => void;
}

export default function CancelAlert({ close }: IProps) {
  return (
    <Alert
      onClose={close}
      buttonColor="primary"
      onAction={() => {}}
      buttonText="취소하기"
    >
      <div className="-mt-4 flex w-full flex-col gap-8">
        <div className="flex items-center justify-between rounded-[12px] border border-gray-600 px-6 py-4">
          <span className="text-2xl font-semibold">2번 테이블</span>
          <strong className="text-primary text-3xl font-bold">
            {(72000).toLocaleString()}원
          </strong>
        </div>
        <span className="text-xl font-medium">결제를 취소하시겠습니까?</span>
      </div>
    </Alert>
  );
}
