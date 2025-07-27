export default function makeKSCATApprovalREQ({
  amount,
  tax,
  nonTax,
  installment,
  type,
}: {
  amount: number;
  tax: number;
  nonTax: number;
  installment: string; // "00", "02", ...
  type: "0" | "1"; // 1 승인, 0 취소
}) {
  const data = {
    stx: String.fromCharCode(2),
    transactionType: "IC",
    businessType: "01",
    messageType: type === "1" ? "0200" : "0420",
    transactionForm: "N",
    terminalId:
      process.env.NODE_ENV === "production" ? "AT0378821A" : "DPT0TEST03",
    companyInfo: "    ",
    seqNo: "000000000000",
    posEntryMode: " ",
    uniqueNo: "                    ",
    unencryptedCardNo: "                    ",
    encryptionYn: " ",
    swModelNo: "                ",
    catModelNo: "                ",
    encryptionInfo: "                                        ",
    cardNo: "                                     ",
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
  const header = `AP${body.toString().padStart(4, "0")}`;

  return `${header}${body}`;
}
