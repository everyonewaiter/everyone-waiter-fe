interface OrderBody {
  menuId: string;
  quantity: number;
  menuOptionGroups: {
    menuOptionGroupId: string;
    orderOptions: MenuOptions[];
  }[];
}

interface CustomOrder {
  menuId: string;
  menuName: string;
  quantity: number;
  totalPrice: number;
  menuOptionGroups: OrderOptionGroups[];
}

type OrderPaymentState = "APPROVE" | "CANCEL";
type OrderPaymentMethod = "CASH" | "CARD";
type OrderReceiptType = "NONE" | "DEDUCTION" | "PROOF";

interface OrderPayments {
  orderPaymentId: string;
  storeId: string;
  state: OrderPaymentState;
  method: OrderPaymentMethod;
  amount: number;
  cancellable: boolean;
  approvalNo: string;
  installment: "00";
  cardNo: string;
  issuerName: string;
  purchaseName: string;
  merchantNo: string;
  tradeTime: string;
  tradeUniqueNo: string;
  vat: number;
  supplyAmount: number;
  cashReceiptNo: string;
  cashReceiptType: OrderReceiptType;
}
