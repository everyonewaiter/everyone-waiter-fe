export default function makeKSCATApprovalREQ({
  installment,
  type,
  transactionType = "IC",
  phoneNumber,
  terminalId,
  orderPayment,
  originalApprovalNo,
  originalApprovalDate,
}: {
  installment: string; // "00", "02", ...
  type: "0" | "1"; // 1 승인, 0 취소
  transactionType?: "IC" | "HK";
  phoneNumber?: string;
  terminalId: string;
  orderPayment?: OrderPaymentsList;
  originalApprovalNo?: string;
  originalApprovalDate?: string;
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
    totalAmount: String(orderPayment?.amount).padStart(12, "0"),
    serviceCharge: "000000000000",
    tax: String(orderPayment?.vat).padStart(12, "0"),
    supplyAmount: String(orderPayment?.supplyAmount).padStart(12, "0"),
    taxFreeAmount: "000000000000",
    workingKeyIndex: "  ",
    password: "                ",
    originalApprovalNo: originalApprovalNo || "            ",
    originalApprovalDate: originalApprovalDate || "      ",
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
  const data = {
    stx: String.fromCharCode(2),
    transactionType: "IC",
    businessType: "01",
    messageType: "0200",
    transactionForm: "N",
    terminalId: params?.terminalId,
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
    installment: params?.installment!,
    totalAmount: String(params?.amount || 0).padStart(12, "0"),
    serviceCharge: "000000000000",
    tax: String(params?.tax).padStart(12, "0"),
    supplyAmount: String(params?.nonTax).padStart(12, "0"),
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

export function cancelCashRequest(params: {
  orderPayment: OrderPaymentsList;
  cashReceiptType: "개인소득공제용" | "사업자증빙용";
  phoneNumber: string;
  terminalId: string;
}) {
  return makeKSCATApprovalREQ({
    ...params,
    type: "0",
    transactionType: "HK",
    installment: params.cashReceiptType === "개인소득공제용" ? "10" : "11",
    phoneNumber: params.phoneNumber,
    terminalId: params.terminalId,
    originalApprovalNo: params.orderPayment.approvalNo
      ? params.orderPayment.approvalNo?.padStart(12, " ")
      : "            ",
    originalApprovalDate: params.orderPayment?.tradeTime
      ? params.orderPayment?.tradeTime?.substring(0, 6)
      : "      ",
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
