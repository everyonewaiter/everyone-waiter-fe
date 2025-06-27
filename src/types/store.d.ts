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
