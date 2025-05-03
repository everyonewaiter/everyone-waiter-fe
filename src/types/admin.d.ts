type AdminAccount = {
  accountId: bigint;
  createdAt: string;
  email: string;
  hasStore: "Y" | "N";
  permission: TPermission;
  state: TStatus;
  updatedAt: string;
};

type TypeAdminStores = {
  accountid: bigint;
  createdAt: string;
  email: string;
  name: string;
  registrationId: bigint;
  status: RegisterStatus;
  updatedAt: string;
};
