interface POSTables {
  posTableId: string;
  storeId: string;
  name: string;
  tableNo: number;
}

type POSTableList =
  | (POSTables & {
      hasOrder: true;
      orderType: DevicePayment;
      orderedAt: string;
      orderMenuName: string;
      orderMenuCount: number;
      totalOrderPrice: number;
      discount: number;
    })
  | (POSTables & {
      hasOrder: false;
      orderType: null;
      orderedAt: null;
      orderMenuName: null;
      orderMenuCount: number;
      totalOrderPrice: number;
      discount: number;
    });

interface OrderOptions {
  name: string;
  price: number;
}

interface OrderOptionGroups {
  orderOptionGroupId: string;
  name: string;
  printEnabled: boolean;
  orderOptions: OrderOptions[];
}

interface TableOrderMenu {
  orderMenuId: string;
  name: string;
  price: number;
  quantity: number;
  served: boolean;
  servedTime: string;
  printEnabled: boolean;
  orderOptionGroups: OrderOptionGruops[];
}

type OrderCategory = "INITIAL" | "ADDITIONAL";
type OrderState = "ORDER" | "CANCEL";

interface TableOrder {
  orderId: string;
  storeId: string;
  category: OrderCategory;
  type: DevicePayment;
  state: OrderState;
  price: number;
  memo: string;
  served: false;
  servedTime: string;
  orderMenus: TableOrderMenu[];
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

interface PosTableActivity {
  posTableActivityId: string;
  storeId: string;
  posTableId: string;
  name: string;
  tableNo: number;
  orderType: DevicePayment;
  totalOrderPrice: number;
  totalPaymentPrice: number;
  discount: number;
  remainingPaymentPrice: number;
  active: boolean;
  orders: TableOrder[];
  orderPayments: OrderPayments[];
}

interface CreateOrder {
  tableNo: number;
  memo: string;
  orderMenus: {
    menuId: string;
    quantity: number;
    name: string;
    menuOptionGroups: OrderOptionGruops[];
  }[];
}
