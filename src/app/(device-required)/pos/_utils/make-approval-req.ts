export default function makeKSCATApprovalREQ({
  amount,
  tax,
  nonTax,
  installment,
  type,
  transactionType = "IC",
  phoneNumber,
  terminalId,
}: {
  amount: number;
  tax: number;
  nonTax: number;
  installment: string; // "00", "02", ...
  type: "0" | "1"; // 1 승인, 0 취소
  transactionType?: "IC" | "HK";
  phoneNumber?: string;
  terminalId: string;
  originalApprovalNo?: string;
  originalApprovalDate?: string;
  originalTradeUniqueNo?: string;
}) {
  const data = {
    stx: String.fromCharCode(2),
    transactionType,
    businessType: "01",
    messageType: type === "1" ? "0200" : "0420",
    transactionForm: "N",
    terminalId,
    companyInfo: "    ",
    seqNo: "000000000000",
    posEntryMode: " ",
    uniqueNo: "                    ",
    unencryptedCardNo: "                    ",
    encryptionYn: " ",
    swModelNo: "                ",
    catModelNo: "                ",
    encryptionInfo: "                                        ",
    trackii:
      transactionType === "HK" && phoneNumber
        ? phoneNumber.replace(/-/g, "").padEnd(37, " ")
        : "                                     ",
    fs: String.fromCharCode(28),
    installment,
    totalAmount: String(amount).padStart(12, "0"),
    serviceCharge: "000000000000",
    tax: String(tax).padStart(12, "0"),
    supplyAmount: String(nonTax).padStart(12, "0"),
    taxFreeAmount: "000000000000",
    workingKeyIndex: "  ",
    password: "                ",
    originalApprovalNo: "            ",
    originalApprovalDate: "      ",
    userInfo: " ".repeat(163),
    signYn: "X",
    etx: String.fromCharCode(3),
    cr: String.fromCharCode(13),
  };

  const body = Object.values(data).join("");
  const header = `AP${body.length.toString().padStart(4, "0")}`;

  return `${header}${body}`;
}

export function createCreditCardApproval(params: {
  amount: number;
  tax: number;
  nonTax: number;
  installment?: string;
  type: "0" | "1";
  terminalId: string;
}) {
  return makeKSCATApprovalREQ({
    ...params,
    transactionType: "IC",
    installment: params.installment!,
    terminalId: params.terminalId,
  });
}

export function createCashReceiptApproval(params: {
  amount: number;
  tax: number;
  nonTax: number;
  type: "0" | "1";
  cashReceiptType: "개인소득공제용" | "사업자증빙용";
  phoneNumber: string;
  terminalId: string;
}) {
  return makeKSCATApprovalREQ({
    ...params,
    transactionType: "HK",
    installment: params.cashReceiptType === "개인소득공제용" ? "00" : "01",
    phoneNumber: params.phoneNumber,
    terminalId: params.terminalId,
  });
}

export function cancelCardRequest({
  terminalId,
  orderPayment,
}: {
  terminalId: string;
  orderPayment?: OrderPaymentsList;
}) {
  const data = {
    stx: String.fromCharCode(2),
    transactionType: "IC",
    businessType: "01",
    messageType: "0420",
    transactionForm: "N",
    terminalId,
    companyInfo: "    ",
    seqNo: "000000000000",
    posEntryMode: " ",
    uniqueNo: "                    ",
    unencryptedCardNo: "                    ",
    encryptionYn: " ",
    swModelNo: "                ",
    catModelNo: "                ",
    encryptionInfo: "                                        ",
    trackii: "                                     ",
    fs: String.fromCharCode(28),
    installment: orderPayment?.installment,
    totalAmount: String(orderPayment?.amount).padStart(12, "0"),
    serviceCharge: "000000000000",
    tax: String(orderPayment?.vat).padStart(12, "0"),
    supplyAmount: String(orderPayment?.supplyAmount).padStart(12, "0"),
    taxFreeAmount: "000000000000",
    workingKeyIndex: "  ",
    password: "                ",
    originalApprovalNo: orderPayment?.approvalNo
      ? orderPayment?.approvalNo?.padStart(12, " ")
      : "            ",
    originalApprovalDate: orderPayment?.tradeTime
      ? orderPayment?.tradeTime?.substring(0, 6)
      : "      ",
    userInfo: " ".repeat(163),
    signYn: "X",
    etx: String.fromCharCode(3),
    cr: String.fromCharCode(13),
  };

  const body = Object.values(data).join("");
  const header = `AP${body.length.toString().padStart(4, "0")}`;

  return `${header}${body}`;
}
