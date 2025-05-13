type TDevicePurpose = "POS" | "HALL" | "WAITING";
type TDevicePayment = "POSTPAID" | "PREPAID";

interface IDevice {
  deviceId: bigint;
  storeId: bigint;
  name: string;
  purpose: TDevicePurpose;
  state: Omit<TStatus, "DELETE">;
  paymentType: TDevicePayment;
  updatedAt: string;
}
