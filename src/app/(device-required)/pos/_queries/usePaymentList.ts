import { useQuery } from "@tanstack/react-query";
import { getPaymentList } from "../_api/payment.api";

/**
 *
 * @param date - yyyyMMdd
 */
const usePaymentsList = (date: string) =>
  useQuery({
    queryKey: ["payments-list"],
    queryFn: () => getPaymentList(date),
    enabled: !!date,
    staleTime: 1000 * 60 * 5,
  });

export const paymentListQueries = {
  usePaymentsList,
};
