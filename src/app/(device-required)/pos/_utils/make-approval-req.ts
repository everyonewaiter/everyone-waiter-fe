export function makeKSCATApprovalREQ({
  orderNo,
  amount,
  tax,
  nonTax,
  installment,
  msg,
}: {
  orderNo: string;
  amount: number;
  tax: number;
  nonTax: number;
  installment: string; // "00", "01", ...
  msg: string;
}): string {
  const header = "AP0452"; // 고정
  const command = "IC010200"; // 카드 결제 명령어
  const merchantId = "NDPT0TEST03"; // 테스트용 가맹점 ID (실제 배포시 교체 필요)

  // 숫자 필드는 길이 맞춰서 앞에 0 채우기
  const pad = (num: number, length: number) =>
    String(num).padStart(length, "0");

  const amountStr = pad(amount, 11);
  const taxStr = pad(tax, 11);
  const nonTaxStr = pad(nonTax, 11);
  const msgStr = msg.padEnd(40, " "); // 메시지는 길이 40자로 맞추기

  return [
    header,
    command,
    merchantId,
    orderNo.padEnd(20, " "), // 주문번호는 최대 20자
    amountStr,
    taxStr,
    nonTaxStr,
    installment,
    msgStr,
  ].join("");
}
