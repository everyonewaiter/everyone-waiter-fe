export const deviceKeys = {
  all: (storeId: string) => ["get-devices", storeId] as const,
  detail: (storeId: string, deviceId: string) =>
    ["get-device-detail", storeId, deviceId] as const,
};
