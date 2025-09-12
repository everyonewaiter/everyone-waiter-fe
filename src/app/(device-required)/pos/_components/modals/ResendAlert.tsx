import dynamic from "next/dynamic";
import { posQueries } from "../../_queries/usePos";

const Alert = dynamic(() => import("@/components/common/Alert/Alert"), {
  ssr: false,
});

interface IProps {
  close: () => void;
  tableNo: number;
}

export default function ResendAlert({ close, tableNo }: IProps) {
  const resend = posQueries.useResendReceipt();

  const handleResend = () => {
    resend.mutate({ tableNo: Number(tableNo) });
  };

  return (
    <Alert
      onAction={handleResend}
      onClose={close}
      buttonText="재전송하기"
      buttonColor="black"
      noResponsive
    >
      <div className="flex flex-col gap-3">
        <strong className="text-primary text-[28px] font-semibold">
          {tableNo}번 테이블 주문
        </strong>
        <span className="text-xl font-medium">주방 프린터에 재전송할까요?</span>
      </div>
    </Alert>
  );
}
