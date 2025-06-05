import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon";
import { ScrollArea } from "@/components/common/ScrollArea";
import { MinusIcon, PlusIcon } from "lucide-react";
import { Fragment } from "react";
import useOverlay from "@/hooks/use-overlay";
import QueryProviders from "@/app/query-providers";
import CancelAlert from "./modals/CancelAlert";
import AddDiscountAlert from "./modals/AddDiscountAlert";
import PayAlert from "./modals/PayAlert";
import MenuBox from "./MenuBox";
import SideLayout from "./SideLayout";

export default function SideSection() {
  const cancelModal = useOverlay();
  const discountModal = useOverlay();
  const payModal = useOverlay();

  const handleCancel = () => {
    cancelModal.open(() => (
      <QueryProviders>
        <CancelAlert close={cancelModal.close} />
      </QueryProviders>
    ));
  };

  const handleDiscount = () => {
    discountModal.open(() => (
      <QueryProviders>
        <AddDiscountAlert close={discountModal.close} />
      </QueryProviders>
    ));
  };

  const handlePay = (type: "cash" | "credit-card") => {
    payModal.open(() => (
      <QueryProviders>
        <PayAlert close={payModal.close} type={type} />
      </QueryProviders>
    ));
  };

  return (
    <SideLayout>
      <div className="flex items-center justify-between">
        <strong className="text-gray-0 text-[28px] font-semibold">
          2번 테이블
        </strong>
        <Button
          asChild={false}
          variant="outline"
          color="primary"
          className="button-lg !rounded-[8px] text-[15px]"
          onClick={handleCancel}
        >
          결제 취소
        </Button>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex gap-3">
          <Button
            variant="outline"
            color="grey"
            className="button-xl !w-14 !rounded-[12px] border-gray-600 !px-0 !text-gray-300"
          >
            <MinusIcon size={24} />
          </Button>
          <Button
            variant="outline"
            color="grey"
            className="button-xl !w-14 !rounded-[12px] border-gray-600 !px-0 !text-gray-300"
          >
            <PlusIcon size={24} />
          </Button>
        </div>
        <Button
          variant="outline"
          color="grey"
          className="button-xl !w-14 !rounded-[12px] border-gray-600 !px-0 !text-gray-300"
        >
          <Icon iconKey="trash" size={24} />
        </Button>
      </div>
      <div className="flex flex-col">
        <ScrollArea className="h-[395px] w-full">
          {[1, 2].map((item, index, arr) => (
            <Fragment key={item}>
              <MenuBox key={item} index={index} hasCheckbox />
              {index < arr.length - 1 && (
                <div className="my-8 h-[2px] w-full bg-gray-700" />
              )}
            </Fragment>
          ))}
        </ScrollArea>
        <div>
          <div className="my-8 h-[2px] w-full bg-gray-600" />
          <div className="flex items-center justify-between">
            <span className="font-regular text-xl text-gray-300">할인</span>
            <Button
              variant="outline"
              color="black"
              className="h-10 rounded-[8px] border border-[#4f4f4f] px-5"
              onClick={handleDiscount}
            >
              할인수단 추가
            </Button>
          </div>
          <div className="mt-3 flex items-center justify-between rounded-[12px] border border-gray-600 bg-gray-700 p-4">
            <span>15% 할인</span>
            <span>{(1000).toLocaleString()}원</span>
          </div>
          <div className="mt-8 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-regular text-lg text-gray-300">
                  총 주문 금액
                </span>
                <span className="text-xl">{(30000).toLocaleString()}원</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-regular text-lg text-gray-300">
                  할인된 금액
                </span>
                <span className="text-primary text-xl">
                  {(17000).toLocaleString()}원
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <strong className="text-2xl font-semibold">결제할 금액</strong>
              <strong className="text-4xl font-bold">
                {(17000).toLocaleString()}원
              </strong>
            </div>
          </div>
          <div className="mt-8 flex gap-3">
            <Button
              variant="outline"
              color="black"
              className="flex h-[64px] flex-1 rounded-[12px] px-8"
              onClick={() => handlePay("cash")}
            >
              현금 결제
            </Button>
            <Button
              color="black"
              className="flex h-[64px] flex-1 rounded-[12px] px-8"
              onClick={() => handlePay("credit-card")}
            >
              카드 결제
            </Button>
          </div>
        </div>
      </div>
    </SideLayout>
  );
}
