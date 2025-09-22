import { useMutation } from "@tanstack/react-query";
import { UseFormReturn } from "react-hook-form";
import { approvePayment, cancelPayment } from "../_api/payment.api";
import { PropsWithTableNo } from "../_api/pos.api";
import {
  cancelCardRequest,
  cancelCashRequest,
  createCashReceiptApproval,
  createCreditCardApproval,
} from "../_utils/make-approval-req";
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

  const handleCash = async ({
    receiptType,
    phoneNumber,
    amount,
    tableNo,
    terminalId,
    successHandler,
  }: {
    receiptType: "신청안함" | "개인소득공제용" | "사업자증빙용";
    phoneNumber: string;
    amount: number;
    tableNo: number;
    successHandler: (res?: PaymentResponse) => void;
    terminalId: string;
  }) => {
    const nonTax = Math.floor(amount / 1.1);

    if (receiptType !== "신청안함") {
      const req = createCashReceiptApproval({
        amount,
        tax: amount - nonTax,
        nonTax,
        cashReceiptType: receiptType,
        type: "1",
        phoneNumber,
        terminalId,
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
          switch (res.RESPCODE) {
            case "0000":
              handlePayWithCash({
                tableNo,
                body: {
                  amount,
                  cashReceiptNo: phoneNumber,
                  cashReceiptType:
                    receiptType === "개인소득공제용" ? "DEDUCTION" : "PROOF",
                },
                successHandler: () => successHandler(res),
              });
              break;
            case "5001":
              // eslint-disable-next-line
              alert("현금 영수증 발급 실패: 미등록 단말기");
              break;
            case "5002":
              // eslint-disable-next-line
              alert("현금 영수증 발급 실패: 현금 거래 불가 (국세청 전화요망)");
              break;
            case "5004":
              // eslint-disable-next-line
              alert(
                "현금 영수증 발급 실패: 금액 오류 (승인 금액은 5천원 이상)"
              );
              break;
            default:
              break;
          }
        },
      });
    } else {
      handlePayWithCash({
        tableNo,
        body: {
          amount,
          cashReceiptNo: phoneNumber,
          cashReceiptType: "NONE",
        },
        successHandler: () => successHandler(),
      });
    }
  };

  const handleCard = async ({
    form,
    amount,
    tableNo,
    terminalId,
    successHandler,
  }: {
    form: UseFormReturn<TypePayForm, any, TypePayForm>;
    amount: number;
    tableNo: number;
    successHandler: (res: PaymentResponse) => void;
    terminalId: string;
  }) => {
    const nonTax = Math.floor(amount / 1.1);
    const installment =
      form.watch("monthlyPlan") === "일시불" ? "00" : form.watch("monthlyPlan");

    const req = createCreditCardApproval({
      amount,
      tax: amount - nonTax,
      nonTax,
      installment,
      type: "1",
      terminalId,
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
        switch (res.RESPCODE) {
          case "0000":
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
            break;
          case "6003":
          case "6005":
            // eslint-disable-next-line
            alert("유효하지 않은 카드입니다.");
            return;
          case "8314":
            // eslint-disable-next-line
            alert("카드 승인 실패: 카드 유효기간이 경과되었습니다.");
            return;
          case "8325":
          case "8326":
          case "8327":
          case "8328":
          case "8329":
          case "8330":
          case "8331":
          case "8332":
            // eslint-disable-next-line
            alert(
              "카드 한도가 초과되었습니다. 다른 결제 방법을 이용해 주세요."
            );
            break;
          default:
            // eslint-disable-next-line
            alert("카드 승인 실패: 카드 승인 실패");
        }
      },
    });
  };

  const handleCancelCard = async ({
    orderPayment,
    successHandler,
    terminalId,
  }: {
    successHandler?: (res: PaymentResponse) => void;
    terminalId: string;
    orderPayment?: OrderPaymentsList;
  }) => {
    const req = cancelCardRequest({
      terminalId,
      orderPayment,
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
        cancelPay.mutate(
          {
            orderPaymentId: orderPayment?.orderPaymentId!,
            body: {
              approvalNo: res.APPROVALNO,
              tradeTime: res.TRADETIME,
              tradeUniqueNo: res.TRADEUNIQUENO,
            },
          },
          {
            onSuccess: () => {
              if (res.RESPCODE === "0000") {
                successHandler?.(res);
                return;
              }

              if (res.RESPCODE === "8009") {
                // eslint-disable-next-line
                alert("원거래를 찾을 수 없습니다.");
                return;
              }

              if (res.RESPCODE === "8032") {
                // eslint-disable-next-line
                alert("이미 취소된 거래입니다.");
                return;
              }

              if (orderPayment?.cardNo !== res.FILLER) {
                // eslint-disable-next-line
                alert("카드 취소 실패: 카드 번호가 일치하지 않습니다.");
              }
            },
          }
        );
      },
    });
  };

  const handleCancelCash = async ({
    orderPayment,
    terminalId,
    successHandler,
  }: {
    orderPayment: OrderPaymentsList;
    successHandler: () => void;
    terminalId: string;
  }) => {
    if (orderPayment.cashReceiptType !== "NONE") {
      const req = cancelCashRequest({
        orderPayment,
        cashReceiptType:
          orderPayment.cashReceiptType === "DEDUCTION"
            ? "개인소득공제용"
            : "사업자증빙용",
        phoneNumber: orderPayment.cashReceiptNo,
        terminalId,
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
          switch (res.RESPCODE) {
            case "0000":
              cancelPay.mutate(
                {
                  orderPaymentId: orderPayment.orderPaymentId,
                  body: {
                    approvalNo: res.APPROVALNO,
                    tradeTime: res.TRADETIME,
                    tradeUniqueNo: res.TRADEUNIQUENO,
                  },
                },
                {
                  onSuccess: successHandler,
                }
              );
              break;
            case "5006":
              // eslint-disable-next-line
              alert("현금 영수증 취소 실패: 취소 내역 불일치");
              break;
            case "5002":
              // eslint-disable-next-line
              alert("현금 영수증 취소 실패: 현금 거래 불가 (국세청 전화요망)");
              break;
            case "5004":
              // eslint-disable-next-line
              alert(
                "현금 영수증 취소 실패: 금액 오류 (승인 금액은 5천원 이상)"
              );
              break;
            case "5008":
              // eslint-disable-next-line
              alert("현금 영수증 취소 실패: 이미 취소된 거래입니다.");
              break;
            case "5011":
              // eslint-disable-next-line
              alert("현금 영수증 취소 실패: KSNET 전산 장애");
              break;
            default:
              break;
          }
        },
      });
    } else {
      cancelPay.mutate(
        {
          orderPaymentId: orderPayment.orderPaymentId,
          body: {
            approvalNo: orderPayment.approvalNo,
            tradeTime: orderPayment.tradeTime,
            tradeUniqueNo: orderPayment.tradeUniqueNo,
          },
        },
        {
          onSuccess: successHandler,
        }
      );
    }
  };

  return {
    approvePay,
    cancelPay,
    payCard: handleCard,
    payCash: handleCash,
    cancelCard: handleCancelCard,
    cancelCash: handleCancelCash,
    printReceipt: handlePrintCashReceipt,
  };
}
