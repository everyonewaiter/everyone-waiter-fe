type TAccount = {
  email: string;
  password: string;
  phoneNumber: string;
};

type ADMIN = "ADMIN";
type USER = "USER";
type OWNER = "OWNER";

type TPermission = ADMIN | USER | OWNER;
