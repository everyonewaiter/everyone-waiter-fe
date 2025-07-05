export default function makeKSCATApprovalREQ({
  amount,
  tax,
  installment,
}: {
  amount: number;
  tax: number;
  installment: string; // "00", "06" 같은 문자열
}) {
  const pad = (value: string | number, length: number, alignRight = true) => {
    const str = String(value);
    return alignRight ? str.padStart(length, "0") : str.padEnd(length, " ");
  };

  const prefix = "AP";
  const stx = "0452";
  const transactionType = "IC";
  const workType = "01";
  const messageType = "0200";
  const transactionFlag = "N";
  const terminalId = pad("DPT0TEST03", 15, false);
  const companyId = "0000";
  const serialNo = "000000000000"; // TODO: 필요 시 고유값 생성
  const installmentTerm = installment; // 2자리
  const taxAmount = pad(tax, 12);
  const supplyAmount = pad(amount - tax, 12); // 공급가 = 총액 - 세금
  const totalAmount = pad(amount, 12);
  const serviceCharge = "000000000000";
  const filler = "00000000"; // filler (미사용 8자리)
  const noSignFlag = "X";

  const body = [
    stx,
    transactionType,
    workType,
    messageType,
    transactionFlag,
    terminalId,
    companyId,
    serialNo,
    installmentTerm,
    totalAmount,
    serviceCharge,
    taxAmount,
    supplyAmount,
    filler,
    noSignFlag,
  ].join("");

  const length = pad(prefix.length + 5 + body.length, 5); // 전체 전문 길이

  return `${prefix}${length}${body}`;
}
