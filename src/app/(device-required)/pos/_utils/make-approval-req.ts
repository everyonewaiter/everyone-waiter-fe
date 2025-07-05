export default function makeKSCATApprovalREQ({
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
  installment: string;
  msg: string;
}) {
  const pad = (value: string | number, length: number, alignRight = true) => {
    const str = String(value);
    return alignRight ? str.padStart(length, "0") : str.padEnd(length, " ");
  };

  const prefix = "AP";
  const formatVersion = "C";
  const type = "0100";
  const bizType = "20";
  const merchantId = pad("NOPTOTESTO3", 15, false); // 왼쪽 정렬
  const paddedOrderNo = pad(orderNo, 40, false);
  const totalAmount = pad(amount, 9);
  const taxAmount = pad(tax, 9);
  const nonTaxAmount = pad(nonTax, 9);
  const installmentTerm = pad(installment, 2);
  const message = pad(msg, 40, false);

  // 전문 길이 계산
  const body = [
    formatVersion,
    type,
    bizType,
    merchantId,
    paddedOrderNo,
    totalAmount,
    taxAmount,
    nonTaxAmount,
    installmentTerm,
    message,
  ].join("");

  const length = pad(body.length + 7, 5); // 전체 전문 길이 (prefix + length 제외하고 나머지 길이)

  return `${prefix}${length}${body}`;
}
