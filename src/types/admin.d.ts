type AdminAccount = {
  accountId: bigint;
  createdAt: string;
  email: string;
  hasStore: "Y" | "N";
  permission: TPermission;
  stats: TStatus;
  updatedAt: string;
};
