import { useMutation } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { approvePayment, cancelPayment } from "../_api/payment.api";
import { PropsWithTableNo } from "../_api/pos.api";
import makeKSCATApprovalREQ from "../_utils/make-approval-req";

interface FormType {
  receiptType: string;
  phoneNumber: string;
  monthlyPlan: string;
}

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
      { onSuccess: successHandler }
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
          method: "CARD",
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
      { onSuccess: successHandler }
    );
  };

  const handleCard = async ({
    form,
    amount,
    tableNo,
    successHandler,
  }: {
    form: UseFormReturn<FormType, any, FormType>;
    amount: number;
    tableNo: number;
    successHandler: () => void;
  }) => {
    const taxValue = Math.floor(amount / 10);
    const installment =
      form.watch("monthlyPlan") === "일시불" ? "00" : form.watch("monthlyPlan");

    const req = makeKSCATApprovalREQ({
      amount,
      tax: taxValue,
      nonTax: amount - taxValue,
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
        // eslint-disable-next-line no-console
        console.log(res);
        handlePayWithCard({
          tableNo,
          body: {
            amount,
            vat: taxValue,
            supplyAmount: amount - taxValue,
            approvalNo: res.APPROVALNO,
            installment,
            cardNo: res.FILLER,
            purchaseName: res.PURCHASENAME,
            merchantNo: res.MERCHANTNUMBER,
            tradeTime: res.TRADETIME,
            tradeUniqueNo: res.TRADEUNIQUENO,
            issuerName: res.CARDNAME,
          },
          successHandler,
        });
      },
      // eslint-disable-next-line no-console
      error: (e: any) => console.log(e),
    });
  };

  return {
    approvePay,
    cancelPay,
    handlePayWithCard: handleCard,
    handlePayWithCash,
  };
}
