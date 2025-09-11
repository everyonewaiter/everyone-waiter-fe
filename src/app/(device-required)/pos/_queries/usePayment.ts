import { useMutation } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { approvePayment, cancelPayment } from "../_api/payment.api";
import { PropsWithTableNo } from "../_api/pos.api";
import makeKSCATApprovalREQ from "../_utils/make-approval-req";
import { print } from "../_utils/print-fn/print-receipt";
import { TypePayForm } from "../_schema/pos.schema";

export default function usePayment() {
  const approvePay = useMutation({
    mutationFn: approvePayment,
  });

  const cancelPay = useMutation({
    mutationFn: cancelPayment,
  });

  const handlePayWithCard = ({
    tableNo,
    body,
    successHandler,
  }: {
    tableNo: number;
    body: Omit<OrderPayments, "cashReceiptNo" | "cashReceiptType" | "method">;
    successHandler: () => void;
  }) => {
    approvePay.mutate(
      {
        tableNo,
        body: {
          ...body,
          method: "CARD",
          cashReceiptNo: "",
          cashReceiptType: "NONE",
        },
      },
      {
        onSuccess: successHandler,
      }
    );
  };

  const handlePayWithCash = ({
    tableNo,
    body,
    successHandler,
  }: PropsWithTableNo<{
    body: Pick<OrderPayments, "cashReceiptNo" | "cashReceiptType" | "amount">;
    successHandler: () => void;
  }>) => {
    approvePay.mutate(
      {
        tableNo,
        body: {
          ...body,
          method: "CASH",
          vat: Math.floor(body.amount / 10),
          supplyAmount: body.amount - Math.floor(body.amount / 10),
          approvalNo: "",
          installment: "00",
          cardNo: "",
          issuerName: "",
          purchaseName: "",
          merchantNo: "",
          tradeTime: "",
          tradeUniqueNo: "",
        },
      },
      {
        onSuccess: successHandler,
      }
    );
  };

  const handlePrintCashReceipt = async ({
    activity,
    stores,
    successHandler,
  }: {
    activity: PosTableActivity;
    stores: PosStore;
    successHandler?: () => void;
  }) => {
    print({
      type: "cash-receipt",
      activity,
      stores,
      successHandler,
    });
  };


  const handleCard = async ({
    form,
    amount,
    tableNo,
    successHandler,
    errorHandler,
  }: {
    form: UseFormReturn<TypePayForm, any, TypePayForm>;
    amount: number;
    tableNo: number;
    successHandler: (res: PaymentResponse) => void;
    errorHandler: () => void;
  }) => {
    const nonTax = Math.floor(amount / 1.1);
    const installment =
      form.watch("monthlyPlan") === "일시불" ? "00" : form.watch("monthlyPlan");

    let isCompleted = false;

    const timeoutId = setTimeout(() => {
      if (!isCompleted) {
        // eslint-disable-next-line
        alert("결제 기기가 연결되어있지 않거나 결제할 수 없는 상태입니다.");
        errorHandler();
      }
    }, 3000);

    const req = makeKSCATApprovalREQ({
      amount,
      tax: amount - nonTax,
      nonTax,
      installment,
      type: "1",
    });
    await window.$.ajax({
      url: "http://127.0.0.1:27098/",
      dataType: "jsonp",
      jsonp: "callback",
      jsonpCallback: `jsonp${Date.now()}`,
      data: {
        REQ: req,
      },
      success: (res: PaymentResponse) => {
        isCompleted = true;
        clearTimeout(timeoutId);

        handlePayWithCard({
          tableNo,
          body: {
            amount,
            vat: amount - nonTax,
            supplyAmount: nonTax,
            approvalNo: res.APPROVALNO,
            installment,
            cardNo: res.FILLER,
            purchaseName: res.PURCHASENAME,
            merchantNo: res.MERCHANTNUMBER,
            tradeTime: res.TRADETIME,
            tradeUniqueNo: res.TRADEUNIQUENO,
            issuerName: res.CARDNAME,
          },
          successHandler: () => successHandler(res),
        });
      },
    });
  };

  const handleCancelCard = async ({
    totalPaymentPrice,
    successHandler,
  }: {
    totalPaymentPrice: number;
    successHandler?: () => void;
  }) => {
    const nonTax = Math.floor(totalPaymentPrice / 1.1);

    let isCompleted = false;

    const timeoutId = setTimeout(() => {
      if (!isCompleted) {
        // eslint-disable-next-line
        alert(
          "결제 기기가 연결되어있지 않거나 결제를 취소할 수 없는 상태입니다."
        );
      }
    }, 3000);

    const req = makeKSCATApprovalREQ({
      amount: totalPaymentPrice,
      tax: totalPaymentPrice - nonTax,
      nonTax,
      installment: "00",
      type: "0",
    });
    await window.$.ajax({
      url: "http://127.0.0.1:27098/",
      dataType: "jsonp",
      jsonp: "callback",
      jsonpCallback: `jsonp${Date.now()}`,
      data: {
        REQ: req,
      },
      success: (res: PaymentResponse) => {
        isCompleted = true;
        clearTimeout(timeoutId);

        cancelPay.mutate({
          orderPaymentId: "",
          body: {
            approvalNo: res.APPROVALNO,
            tradeTime: res.TRADETIME,
            tradeUniqueNo: res.TRADEUNIQUENO,
          },
        });
        successHandler?.();
      },
    });
  };

  return {
    approvePay,
    cancelPay,
    payCard: handleCard,
    payCash: handlePayWithCash,
    cancelCard: handleCancelCard,
    printReceipt: handlePrintCashReceipt,
  };
}
