type AdminAccount = {
  accountId: bigint;
  createdAt: string;
  email: string;
  hasStore: "Y" | "N";
  permission: AccountPermission;
  state: Status;
  updatedAt: string;
};

type AdminStores = {
  accountid: bigint;
  createdAt: string;
  email: string;
  name: string;
  registrationId: bigint;
  status: RegisterStatus;
  updatedAt: string;
};

type AdminUser = {
  accountId: string;
  createdAt: string;
  updatedAt: string;
  email: string;
  lastSignIn: string;
  permission: AccountPermission;
  phoneNumber: string;
  state: Status;
};
