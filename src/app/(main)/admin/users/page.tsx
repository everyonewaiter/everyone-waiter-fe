import getQueryClient from "@/app/get-query-client";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import UserPage from "./_components/_templates/UserPage";
import { accountKeys } from "../_queries/keys";
import { getAccounts } from "../_api/admin.api";

export default async function Page() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: accountKeys.all(1),
    queryFn: () => getAccounts({ page: 1 }),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <UserPage />
    </HydrationBoundary>
  );
}
