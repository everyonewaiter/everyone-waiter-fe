import dynamic from "next/dynamic";
import QueryProviders from "@/app/query-providers";
import Button from "@/components/common/Button/Button";
import useOverlay from "@/hooks/use-overlay";

const PayAlert = dynamic(() => import("../modals/PayAlert"), {
  ssr: false,
});

interface IProps extends PosTableActivity {
  orderType: DevicePayment;
  remainingPaymentPrice: number;
  onTableComplete: () => void;
}

export default function SidePayment({
  orderType,
  remainingPaymentPrice,
  onTableComplete,
  ...props
}: IProps) {
  const { open, close } = useOverlay();

  const handlePay = (type: "cash" | "credit-card") => {
    open(() => (
      <QueryProviders>
        <PayAlert
          close={close}
          type={type}
          {...props}
          orderType={orderType}
          remainingPaymentPrice={remainingPaymentPrice}
        />
      </QueryProviders>
    ));
  };

  return (
    <>
      <div className="w-full">
        {(orderType === "PREPAID" ||
          (orderType === "POSTPAID" && remainingPaymentPrice === 0)) && (
          <Button
            color="primary"
            className="mt-8 flex !h-[64px] w-full flex-1 items-center justify-center rounded-[12px] !px-8 !text-xl"
            onClick={onTableComplete}
          >
            테이블 완료
          </Button>
        )}
      </div>

      {orderType === "POSTPAID" && remainingPaymentPrice > 0 && (
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
