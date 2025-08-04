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
