export const storeKeys = {
  all: () => ["get-stores"] as const,
  list: (page: number = 1) => [...storeKeys.all(), page] as const,
  stores: () => ["get-stores-list"] as const,
  detail: (storeId: string) => ["store-detail-info", storeId] as const,
  registration: (registrationId: string) =>
    ["register-detail", registrationId] as const,
};
