interface Category {
  categoryId: string;
  name: string;
}

type MenuState = "DEFAULT" | "HIDE" | "SOLD_OUT";
type MenuLabel = "BEST" | "NEW" | null;

interface Menu {
  menuId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  spicy: number;
  state: MenuState;
  label: MenuLabel;
  image: string;
}

interface MenuOptions extends Pick<Menu, "name" | "price"> {}

interface MenuOptionGroups {
  menuOptionGroupId: string;
  name: string;
  type: string;
  printEnabled: boolean;
  menuOptions: MenuOptions[];
}

interface MenuDetail extends Menu {
  printEnabled: boolean;
  menuOptionGroups: MenuOptionGroups[];
}
