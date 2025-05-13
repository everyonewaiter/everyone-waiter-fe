type TAccount = {
  email: string;
  password: string;
  phoneNumber: string;
};

type ADMIN = "ADMIN";
type USER = "USER";
type OWNER = "OWNER";

type Permission = ADMIN | USER | OWNER;

type UserProfile = {
  accountId: string;
  email: string;
  permission: Permission;
};

type TStatus = "INACTIVE" | "ACTIVE" | "DELETE";
