import { useNowContext } from "@/providers/nowProvider";
import dynamic from "next/dynamic";

const Alert = dynamic(() => import("@/components/common/Alert/Alert"), {
  ssr: false,
});

interface IProps {
  close: () => void;
}

export default function SalesModal({ close }: IProps) {
  const { month, date } = useNowContext();

  return (
    <Alert hasNoAction onClose={close} noResponsive>
      <div className="flex flex-col gap-10">
        <div className="flex items-center justify-between text-2xl font-semibold">
          <h1 className="text-gray-0">
            {String(month).padStart(2, "0")}월 {String(date).padStart(2, "0")}일
            매출 내역
          </h1>
          <span className="text-primary">1,000,000원</span>
        </div>
        <div className="flex flex-col gap-5">
          <div className="flex flex-col gap-[10px]">
            <p className="text-left text-xl font-semibold">주문 금액</p>
            <div className="w-full rounded-[12px] border border-gray-600 px-6 py-4">
              <div className="text-gray-0 flex items-center justify-between font-semibold">
                <span className="text-lg">주문 금액</span>
                <span className="text-xl">{(1200000).toLocaleString()}원</span>
              </div>
              <div className="text-gray-0 mt-3 flex items-center justify-between font-semibold">
                <span className="text-lg">할인</span>
                <span className="text-xl">{(200000).toLocaleString()}원</span>
              </div>
            </div>
          </div>
          <div className="flex flex-col gap-[10px]">
            <p className="text-left text-xl font-semibold">결제 금액</p>
            <div className="w-full rounded-[12px] border border-gray-600 px-6 py-4">
              <div className="text-gray-0 flex items-center justify-between font-semibold">
                <span className="text-lg">카드</span>
                <span className="text-xl">{(1200000).toLocaleString()}원</span>
              </div>
              <div className="text-gray-0 mt-3 flex items-center justify-between font-semibold">
                <span className="text-lg">현금</span>
                <span className="text-xl">{(200000).toLocaleString()}원</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Alert>
  );
}
