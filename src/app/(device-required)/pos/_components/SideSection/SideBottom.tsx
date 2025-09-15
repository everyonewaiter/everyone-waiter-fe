import dynamic from "next/dynamic";
import QueryProviders from "@/app/query-providers";
import Button from "@/components/common/Button/Button";
import useOverlay from "@/hooks/useOverlay";

const AddDiscountAlert = dynamic(() => import("../modals/AddDiscountAlert"), {
  ssr: false,
});

interface IProps {
  totalOrderPrice: number;
  discount: number;
  remainingPaymentPrice: number;
  onAddDiscount: (discount: number) => void;
  type?: "pos" | "history";
  resultPayment: number;
}

export default function SideBottom({
  totalOrderPrice,
  discount,
  remainingPaymentPrice,
  onAddDiscount,
  type = "pos",
  resultPayment,
}: IProps) {
  const { open, close } = useOverlay();

  const handleDiscount = () => {
    open(() => (
      <QueryProviders>
        <AddDiscountAlert
          close={close}
          total={totalOrderPrice!}
          onAction={onAddDiscount}
          initialValue={discount}
        />
      </QueryProviders>
    ));
  };

  return (
    <>
      {type === "pos" && (
        <div className="flex items-center justify-between">
          <span className="font-regular text-xl text-gray-300">할인</span>
          <Button
            variant="outline"
            color="black"
            className="h-10 rounded-lg border border-[#4f4f4f] px-5"
            onClick={handleDiscount}
          >
            할인수단 {discount ? "수정" : "추가"}
          </Button>
        </div>
      )}
      <div className="mt-5 flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-regular text-lg text-gray-300">
              총 주문 금액
            </span>
            <span className="text-xl">
              {totalOrderPrice?.toLocaleString()}원
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="font-regular text-lg text-gray-300">
              할인된 금액
            </span>
            <span className="text-primary text-xl">
              {discount ? `- ${discount.toLocaleString()}` : discount}원
            </span>
          </div>
        </div>
        <div className="flex items-center justify-between">
          <strong className="text-2xl font-semibold">
            결제{type === "pos" ? "할" : "된"} 금액
          </strong>
          <strong className="text-4xl font-bold">
            {type === "pos"
              ? remainingPaymentPrice.toLocaleString()
              : resultPayment.toLocaleString()}
            원
          </strong>
        </div>
      </div>
    </>
  );
}
