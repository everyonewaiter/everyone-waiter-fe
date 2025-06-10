interface StoreForm {
  name: string;
  ceoName: string;
  address: string;
  landline: string;
  license: string;
  file: File | null;
}

type RegisterStatus = "APPLY" | "REAPPLY" | "APPROVE" | "REJECT";

interface StoreDetail extends Omit<StoreForm, "file"> {
  accountId: string;
  createdAt: string;
  image: string;
  reason: string;
  registrationId: bigint;
  status: RegisterStatus;
  updatedAt: string;
}

type StoreStatus = "OPEN" | "CLOSE";

interface CountryOfOriginItem {
  item: string;
  origin: string;
}

interface Settings {
  extraTableCount: number;
  printerLocation: string;
  showMenuPopup: boolean;
  showOrderTotalPrice: boolean;
  countryOfOrigin: CountryOfOriginItem[];
  staffCallOptions: string[];
}

interface StoreInfoDetail extends Omit<StoreForm, "file"> {
  accountId: bigint;
  storeId: bigint;
  image: string;
  status: StoreStatus;
  lastOpenedAt: string;
  lastClosedAt: string;
  setting: Settings;
  createdAt: string;
  updatedAt: string;
}

// 매장 목록

interface Store {
  storeId: string;
  name: string;
}

interface StoreList {
  stores: Store[];
}

interface Category {
  categoryId: string;
  name: string;
}

interface CategoryList {
  categories: Category[];
}

type MenuState = "DEFAULT" | "HIDE" | "SOLD_OUT";

interface Menu {
  menuId: string;
  categoryId: string;
  name: string;
  description: string;
  price: number;
  spicy: number;
  state: MenuState;
  label: string;
  image: string;
}

interface MenuList {
  menus: Menu[];
}

interface MenuOption {
  name: string;
  price: number;
}

interface MenuOptionGroup {
  menuOptionGroupId: string;
  name: string;
  type: "MANDATORY" | "OPTIONAL";
  printEnabled: boolean;
  menuOptions: MenuOption[];
}
interface MenuWithOption extends Menu {
  printEnabled: boolean;
  menuOptions: MenuOptionGroup[];
}

interface MenuListWithCategory {
  categories: {
    categoryId: string;
    name: string;
    menus: MenuWithOption[];
  }[];
}
