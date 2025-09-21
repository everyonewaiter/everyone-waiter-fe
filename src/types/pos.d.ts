interface POSTables {
  posTableId: string;
  storeId: string;
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
  orderOptionGroups: OrderOptionGroups[];
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

interface PosTableActivity {
  posTableActivityId: string;
  storeId: string;
  posTableId: string;
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

interface PosStore extends Omit<StoreForm, "file"> {
  storeId: string;
  image: string;
  status: StoreStatus;
  lastOpenedAt: string;
  lastClosedAt: string;
}
