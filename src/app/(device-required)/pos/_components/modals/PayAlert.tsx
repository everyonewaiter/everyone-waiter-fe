"use client";

import { useForm } from "react-hook-form";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import { useDeviceContext } from "@/providers/deviceStoreProvider";
import { zodResolver } from "@hookform/resolvers/zod";
import getQueryClient from "@/app/get-query-client";
import { useState } from "react";
import useOverlay from "@/hooks/useOverlay";
import { Form } from "@/components/common/Form";
import { storesQueries } from "@/app/(main)/(owner)/[id]/store/_queries/useStores";
import usePayment from "../../_queries/usePayment";
import { print } from "../../_utils/print-fn/print-receipt";
import { useSelectItemStore } from "../../_hooks/useSelectItemStore";
import { posQueries } from "../../_queries/usePos";
import { paySchema, TypePayForm } from "../../_schema/pos.schema";
import { posKeys } from "../../_queries/keys";
import ReceiptModal from "./ReceiptModal";
import PayAlertForm from "./PayAlertForm";

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

export default function PayAlert({ close, type, ...props }: IProps) {
  const navigate = useRouter();
  const queryClient = getQueryClient();

  // 분할 계산
  const { selectedOrder } = useSelectItemStore();
  const { storeId } = useDeviceContext();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const selectedOrdersTotal = selectedOrder.reduce((acc, menu) => {
    const menuPrice = menu.price;
    const optionPrice = menu.orderMenus.reduce(
      (a, c) => a + c.price * c.quantity,
      0
    );
    return acc + menuPrice + optionPrice;
  }, 0);

  const form = useForm<TypePayForm>({
    mode: "onChange",
    resolver: zodResolver(paySchema),
    defaultValues: {
      receiptType: "신청안함",
      phoneNumber: "",
      licenseNumber: "",
      monthlyPlan: "일시불",
    },
  });

  const { payCard, payCash } = usePayment();
  const { data: activityData } = posQueries.useActivity(props.tableNo);
  const { data: stores } = posQueries.useStoreInfo(storeId!);
  const { data: storesDetail } = storesQueries.useStoresDetail(storeId!);

  const receiptOverlay = useOverlay();

  const handleNavigate = () => {
    navigate.push("/pos/tables");
    queryClient.invalidateQueries({ queryKey: posKeys.tables });
  };

  const handleSuccess = () => {
    if (activityData?.remainingPaymentPrice) {
      queryClient.invalidateQueries({
        queryKey: posKeys.activity(activityData?.tableNo),
      });
    } else {
      handleNavigate();
    }
  };

  const handlePrintCard = (res: PaymentResponse) => {
    print({
      type: "card-receipt",
      activity: activityData!,
      stores: stores!,
      payment: { ...res, INSTALLMENT: form.watch("monthlyPlan") },
      paymentTradeTime: res.TRADETIME || "",
      successHandler: () => {
        if (props.orders?.length === 0) {
          handleSuccess();
        }
      },
      close: receiptOverlay.close,
    });
  };

  const handlePrintCash = (res: PaymentResponse) => {
    const options = {
      cashReceiptNo: res.FILLER,
      cashReceiptType: form.watch("receiptType") as OrderReceiptType,
    };

    const printOptions = {
      type: "cash-receipt" as "kitchen" | "cash-receipt" | "card-receipt",
      activity: activityData!,
      stores: stores!,
      successHandler: handleSuccess,
      paymentTradeTime: res?.TRADETIME || "",
      close: receiptOverlay.close,
    };

    if (form.watch("receiptType") === "신청안함") {
      print(printOptions);
    } else {
      print({
        ...printOptions,
        ...options,
      });
    }
  };

  const handleModal = (res?: PaymentResponse) => {
    receiptOverlay.open(() => (
      <ReceiptModal
        close={receiptOverlay.close}
        onConfirm={() => {
          if (type === "credit-card") {
            handlePrintCard(res!);
          } else {
            handlePrintCash(res!);
          }
          handleSuccess();
        }}
        onCancel={handleNavigate}
      />
    ));
  };

  const handlePayment = () => {
    setIsSubmitting(true);

    const amount =
      selectedOrder?.length > 0
        ? selectedOrdersTotal
        : props.remainingPaymentPrice;

    if (type === "credit-card") {
      payCard({
        tableNo: props.tableNo,
        form,
        amount,
        terminalId: storesDetail?.setting?.ksnetDeviceNo!,
        successHandler: (res) => {
          close();
          handleModal(res);
        },
      });
    } else {
      payCash({
        tableNo: props.tableNo,
        amount,
        receiptType: form.watch("receiptType"),
        phoneNumber:
          form.watch("receiptType") === ReceiptType.PROOF
            ? form.watch("licenseNumber")!
            : form.watch("phoneNumber")!,
        terminalId: storesDetail?.setting?.ksnetDeviceNo!,
        successHandler: () => {
          close();
          handleModal();
        },
      });
    }
  };

  return (
    <Alert
      primaryButton={{
        text: type === "cash" ? "현금 결제하기" : "카드 결제하기",
        onClick: handlePayment,
        color: "black",
      }}
      onClose={close}
      hasNoCancel
      layoutClassName="!w-[648px]"
      noResponsive
      isSubmitted={isSubmitting}
    >
      <Form {...form}>
        <PayAlertForm
          type={type}
          hasOrderId={selectedOrder?.length > 0}
          selectedOrdersTotal={selectedOrdersTotal}
          onClose={close}
          {...props}
        />
      </Form>
    </Alert>
  );
}
