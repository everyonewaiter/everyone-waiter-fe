type AdminAccount = {
  accountId: bigint;
  createdAt: string;
  email: string;
  hasStore: "Y" | "N";
  permission: TPermission;
  state: TStatus;
  updatedAt: string;
};
