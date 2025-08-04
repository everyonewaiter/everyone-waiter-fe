type Account = {
  email: string;
  password: string;
  phoneNumber: string;
};

type AccountPermission = "ADMIN" | "USER" | "OWNER";

type UserProfile = {
  accountId: string;
  email: string;
  permission: AccountPermission;
};

type Status = "INACTIVE" | "ACTIVE" | "DELETE";
