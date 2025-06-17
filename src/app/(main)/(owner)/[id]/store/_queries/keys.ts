export const storeKeys = {
  list: () => ["get-stores"] as const,
  stores: () => ["get-stores-list"] as const,
  detail: (storeId: string) => ["store-detail-info", storeId] as const,
  registration: (registrationId: string) =>
    ["register-detail", registrationId] as const,
};
