import Alert from "@/components/common/Alert/Alert";

interface IProps {
  close: () => void;
}

export default function ResendAlert({ close }: IProps) {
  return (
    <Alert
      onAction={() => {}}
      onClose={close}
      buttonText="재전송하기"
      buttonColor="black"
      noResponsive
    >
      <div className="flex flex-col gap-3">
        <strong className="text-primary text-[28px] font-semibold">
          2번 테이블 주문
        </strong>
        <span className="text-xl font-medium">주방 프린터에 재전송할까요?</span>
      </div>
    </Alert>
  );
}
