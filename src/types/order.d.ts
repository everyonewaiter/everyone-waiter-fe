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
