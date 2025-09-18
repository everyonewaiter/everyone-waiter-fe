"use client";

import dynamic from "next/dynamic";
import { Form } from "@/components/common/Form";
import { useEffect } from "react";
import { useSelectItemStore } from "../../_hooks/useSelectItemStore";
import PayAlertForm from "./PayAlertForm";
import useHandlerPay from "../../_hooks/useHandlerPay";

const Alert = dynamic(() => import("@/components/common/Alert/Alert"), {
  ssr: false,
});

declare global {
  interface Window {
    $: any;
  }
}

export enum ReceiptType {
  NONE = "신청안함",
  DEDUCTION = "개인소득공제용",
  PROOF = "사업자증빙용",
}

interface IProps extends PosTableActivity {
  close: () => void;
  type: "credit-card" | "cash";
  payment?: PaymentResponse;
}

export default function PayAlert({ ...props }: IProps) {
  const { selectedOrder, selectedMenu } = useSelectItemStore();

  const selectedOrdersTotal = selectedOrder.reduce((acc, menu) => {
    const menuPrice = menu.price;
    const optionPrice = menu.orderMenus.reduce(
      (a, c) => a + c.price * c.quantity,
      0
    );
    return acc + menuPrice + optionPrice;
  }, 0);

  const selectedMenusTotal = selectedMenu.reduce(
    (acc, menu) => acc + menu.price,
    0
  );

  const INIT_VALUE =
    selectedOrder?.length > 0
      ? selectedOrdersTotal
      : props.remainingPaymentPrice;

  const { form, isSubmitting, handlePayment, payValue, setPayValue } =
    useHandlerPay({
      initialPayValue: INIT_VALUE,
      ...props,
    });

  useEffect(() => {
    if (selectedMenu.length > 0) {
      setPayValue(selectedMenusTotal);
    } else if (selectedOrder.length > 0) {
      setPayValue(selectedOrdersTotal);
    }
    // eslint-disable-next-line
  }, [selectedMenu, selectedOrder]);

  return (
    <Alert
      primaryButton={{
        text: props.type === "cash" ? "현금 결제하기" : "카드 결제하기",
        onClick: handlePayment,
        color: "black",
      }}
      onClose={props.close}
      hasNoCancel
      layoutClassName="!w-[648px]"
      noResponsive
      isSubmitted={isSubmitting}
    >
      <Form {...form}>
        <PayAlertForm
          hasOrderId={selectedOrder?.length > 0}
          selectedOrdersTotal={selectedOrdersTotal}
          onClose={props.close}
          payValue={payValue}
          onSetPayValue={setPayValue}
          {...props}
          type={props.type}
        />
      </Form>
    </Alert>
  );
}
