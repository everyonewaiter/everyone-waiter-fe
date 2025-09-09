interface ReceiptSSE {
  memo: string;
  printNo: number;
  tableNo: number;
  receiptMenus: { name: string; options: string[]; quantity: number }[];
}
