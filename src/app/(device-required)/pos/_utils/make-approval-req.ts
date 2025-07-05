export default function makeKSCATApprovalREQ({
  amount,
  tax,
  nonTax,
  installment,
}: {
  amount: number;
  tax: number;
  nonTax: number;
  installment: string; // "00", "02", ...
}) {
  const pad = (val: string | number, len: number) =>
    String(val).padStart(len, "0");

  const fixedFields = {
    prefix: "AP",
    stx: "0452", // 전문길이 포함해서 고정
    transType: "IC",
    businessCode: "01", // 승인
    messageCode: "0200", // 승인
    tradeType: "N",
    terminalId: "DPT0TEST03", // 실제 등록된 단말기 번호
    merchantId: "0000",
    serialNo: "000000000000",
    serviceFee: "000000000000",
    dutyFree: "000000000000",
    noSign: "X", // 무서명 거래
  };

  const totalAmount = pad(amount, 12);
  const taxAmount = pad(tax, 12);
  const supplyAmount = pad(nonTax, 12);
  const installmentTerm = pad(installment, 2);

  const body = [
    fixedFields.transType,
    fixedFields.businessCode,
    fixedFields.messageCode,
    fixedFields.tradeType,
    fixedFields.terminalId,
    fixedFields.merchantId,
    fixedFields.serialNo,
    installmentTerm,
    totalAmount,
    fixedFields.serviceFee,
    taxAmount,
    supplyAmount,
    fixedFields.dutyFree,
    fixedFields.noSign,
  ].join("");

  const totalLength = fixedFields.prefix + fixedFields.stx + body;

  return totalLength;
}
