import QueryProviders from "@/app/query-providers";
import Button from "@/components/common/Button/Button";
import useOverlay from "@/hooks/use-overlay";
import PayAlert from "../modals/PayAlert";

interface IProps {
  orderType: DevicePayment;
  remainingPaymentPrice: number;
  onTableComplete: () => void;
}

export default function SidePayment({
  orderType,
  remainingPaymentPrice,
  onTableComplete,
}: IProps) {
  const { open, close } = useOverlay();

  const handlePay = (type: "cash" | "credit-card") => {
    open(() => (
      <QueryProviders>
        <PayAlert close={close} type={type} />
      </QueryProviders>
    ));
  };

  return (
    <>
      {orderType === "PREPAID" && (
        <Button
          color="primary"
          className="mt-8 flex h-[64px] flex-1 rounded-[12px] px-8 text-xl"
          onClick={onTableComplete}
        >
          테이블 완료
        </Button>
      )}
      {(orderType === "POSTPAID" || remainingPaymentPrice === 0) && (
        <div className="mt-8 flex gap-3">
          <Button
            variant="outline"
            color="black"
            className="flex h-[64px] flex-1 rounded-[12px] px-8 text-xl"
            onClick={() => handlePay("cash")}
          >
            현금 결제
          </Button>
          <Button
            color="black"
            className="flex h-[64px] flex-1 rounded-[12px] px-8 text-xl"
            onClick={() => handlePay("credit-card")}
          >
            카드 결제
          </Button>
        </div>
      )}
    </>
  );
}
