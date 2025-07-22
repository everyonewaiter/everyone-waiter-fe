export const accountKeys = {
  all: (
    page?: number,
    email?: string,
    permission?: AccountPermission | "",
    state?: Status | ""
  ) => ["get-account", { page, email, permission, state }],
  accountDetail: (id: string) => ["detail-account", id],
  allToApprove: (filters?: {
    email?: string;
    name?: string;
    status?: RegisterStatus | null;
    page?: number;
  }) => ["stores-to-approve", filters] as const,

  storeDetail: (registrationId: string) =>
    ["admin-stores-detail", registrationId] as const,
};
