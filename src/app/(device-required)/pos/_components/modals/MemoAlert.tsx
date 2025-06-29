import Alert from "@/components/common/Alert/Alert";
import Textarea from "@/components/common/TextArea";

interface IProps {
  close: () => void;
  tableNo: number;
}

export default function MemoAlert({ close, tableNo }: IProps) {
  return (
    <Alert onClose={close} noResponsive>
      <div className="-mt-4 flex w-full flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-semibold">메모</h3>
          <span className="text-lg font-semibold">{tableNo}번 테이블</span>
        </div>
        <Textarea
          className="h-[120px]"
          placeholder="예약 관련 메모를 작성해주세요."
          // value={value}
          readOnly
        />
      </div>
    </Alert>
  );
}
