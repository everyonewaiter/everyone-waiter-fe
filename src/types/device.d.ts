type DevicePurpose = "POS" | "HALL" | "WAITING";
type DevicePayment = "POSTPAID" | "PREPAID";

interface Device {
  deviceId: string;
  storeId: string;
  name: string;
  purpose: DevicePurpose;
  state: Omit<Status, "DELETE">;
  paymentType: DevicePayment;
  updatedAt: string;
}
