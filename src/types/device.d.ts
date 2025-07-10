type DevicePurpose = "POS" | "HALL" | "WAITING" | "TABLE";
type DevicePayment = "POSTPAID" | "PREPAID";

interface Device {
  deviceId: string;
  storeId: string;
  name: string;
  purpose: DevicePurpose;
  state: Omit<Status, "DELETE">;
  paymentType: DevicePayment;
  updatedAt: string;
  createdAt: string;
}
