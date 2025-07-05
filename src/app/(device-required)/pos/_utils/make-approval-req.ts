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

  // 길이 계산: AP (2) + length (5) 제외한 body의 길이
  const length = pad(prefix.length + 5 + body.length, 5); // total length

  return `${prefix}${length}${body}`;
}
