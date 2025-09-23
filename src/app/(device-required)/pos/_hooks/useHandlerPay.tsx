import { storesQueries } from "@/app/(main)/(owner)/[id]/store/_queries/useStores";
import { useState } from "react";
import useOverlay from "@/hooks/useOverlay";
import { useRouter } from "next/navigation";
import getQueryClient from "@/app/get-query-client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import usePayment from "../_queries/usePayment";
import { ReceiptType } from "../_components/modals/PayAlert";
import { print } from "../_utils/print-fn/print-receipt";
import ReceiptModal from "../_components/modals/ReceiptModal";
import { posKeys } from "../_queries/keys";
import { posQueries } from "../_queries/usePos";
import { paySchema, TypePayForm } from "../_schema/pos.schema";

interface IProps extends PosTableActivity {
  initialPayValue: number;
  close: () => void;
  type: "credit-card" | "cash";
}

export default function useHandlerPay({
  initialPayValue,
  close,
  type,
  ...props
}: IProps) {
  const navigate = useRouter();
  const queryClient = getQueryClient();

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
  const { data: storesDetail } = storesQueries.useStoresDetail(props.storeId!);

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [payValue, setPayValue] = useState(initialPayValue);

  const { data: activityData } = posQueries.useActivity(props.tableNo);
  const { data: stores } = posQueries.useStoreInfo(props.storeId!);

  const receiptOverlay = useOverlay();

  const handleSuccess = () => {
    if (activityData?.remainingPaymentPrice! > 0) {
      queryClient.invalidateQueries({
        queryKey: posKeys.activity(activityData?.tableNo!),
      });
      close();
    } else if (payValue === activityData?.remainingPaymentPrice) {
      navigate.push("/pos/tables");
      queryClient.invalidateQueries({ queryKey: posKeys.tables });
    } else {
      close();
    }
  };

  const handlePrintCard = (res?: PaymentResponse, printOrder?: boolean) => {
    print({
      type: "card-receipt",
      activity: activityData!,
      stores: stores!,
      payment: { ...res!, INSTALLMENT: form.watch("monthlyPlan") },
      paymentTradeTime: res?.TRADETIME || "",
      printOrder,
      successHandler: () => {
        if (props.orders?.length === 0) {
          handleSuccess();
        }
      },
      close: receiptOverlay.close,
    });
  };

  const handlePrintCash = (res?: PaymentResponse, printOrder?: boolean) => {
    const receiptType = form.watch("receiptType") as OrderReceiptType;

    const replacedTradeTime =
      String(new Date().getFullYear()).slice(2) +
      String(new Date().getMonth() + 1).padStart(2, "0") +
      String(new Date().getDate()).padStart(2, "0") +
      String(new Date().getHours()).padStart(2, "0") +
      String(new Date().getMinutes()).padStart(2, "0") +
      String(new Date().getSeconds()).padStart(2, "0");

    const printOptions = {
      type: "cash-receipt" as "kitchen" | "cash-receipt" | "card-receipt",
      activity: activityData!,
      stores: stores!,
      successHandler: handleSuccess,
      paymentTradeTime: res?.TRADETIME || replacedTradeTime,
      close: receiptOverlay.close,
      cashReceiptType: receiptType,
    };

    if (form.watch("receiptType") === "신청안함") {
      print({
        ...printOptions,
        printOrder,
      });
    } else {
      print({
        ...printOptions,
        cashReceiptNo: res?.FILLER,
        printOrder,
      });
    }
  };

  const handleModal = (res?: PaymentResponse) => {
    receiptOverlay.open(() => (
      <ReceiptModal
        close={receiptOverlay.close}
        onConfirm={() => {
          if (type === "credit-card") {
            handlePrintCard(res!, true);
          } else {
            handlePrintCash(res!, true);
          }
          handleSuccess();
        }}
        onCancel={() => {
          if (payValue === activityData?.remainingPaymentPrice) {
            navigate.push("/pos/tables");
            queryClient.invalidateQueries({ queryKey: posKeys.tables });
          } else {
            close();
          }
        }}
      />
    ));
  };

  const handlePayment = () => {
    setIsSubmitting(true);

    if (type === "credit-card") {
      payCard({
        tableNo: props.tableNo,
        form,
        amount: payValue,
        terminalId: storesDetail?.setting?.ksnetDeviceNo!,
        successHandler: (res) => {
          close();
          handleModal(res);
        },
        modalClose: close,
      });
    } else {
      payCash({
        tableNo: props.tableNo,
        amount: payValue,
        receiptType: form.watch("receiptType"),
        phoneNumber:
          form.watch("receiptType") === ReceiptType.PROOF
            ? form.watch("licenseNumber")!
            : form.watch("phoneNumber")!,
        terminalId: storesDetail?.setting?.ksnetDeviceNo!,
        successHandler: (res) => {
          close();
          handleModal(res);
        },
        modalClose: close,
      });
    }
  };

  return {
    form,
    isSubmitting,
    handlePayment,
    payValue,
    setPayValue,
  };
}
