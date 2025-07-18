import { useQuery } from "@tanstack/react-query";
import { getPaymentList } from "../_api/payment.api";

export default function usePaymentList() {
  /**
   *
   * @param date - yyyyMMdd
   */
  const payments = (date: string) =>
    // eslint-disable-next-line react-hooks/rules-of-hooks
    useQuery({
      queryKey: ["payments-list"],
      queryFn: () => getPaymentList(date),
      enabled: !!date,
      staleTime: 1000 * 60 * 5,
    });

  return {
    payments,
  };
}
