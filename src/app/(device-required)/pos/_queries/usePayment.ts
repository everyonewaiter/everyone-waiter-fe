import { useMutation } from "@tanstack/react-query";
import { approvePayment, cancelPayment } from "../_api/payment.api";

export default function usePayment() {
  const approvePay = useMutation({
    mutationFn: approvePayment,
  });

  const cancelPay = useMutation({
    mutationFn: cancelPayment,
  });

  return {
    approvePay,
    cancelPay,
  };
}
