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

interface Menu {
  icon: string;
  text: string;
  url: string;
}

type StoreStatus = "OPEN" | "CLOSE";

interface CountryOfOriginItem {
  item: string;
  origin: string;
}

interface StoreInfoDetail extends Omit<StoreForm, "file"> {
  accountId: bigint;
  storeId: bigint;
  image: string;
  status: StoreStatus;
  lastOpenedAt: string;
  lastClosedAt: string;
  setting: {
    extraTableCount: number;
    printerLocation: string;
    showMenuPopup: boolean;
    showOrderTotalPrice: boolean;
    countryOfOrigin: CountryOfOriginItem[];
    staffCallOptions: string[];
  };
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
