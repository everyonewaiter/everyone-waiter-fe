/* eslint-disable react-hooks/rules-of-hooks */
import {
  getAccounts,
  getDetailAccount,
  updateDetailAccount,
} from "@/lib/api/admin.api";
import { useMutation, useQuery } from "@tanstack/react-query";

const useAdmin = () => {
  const accountList = (
    searchEmail: string,
    searchPermission: TPermission | "",
    searchState: TStatus | "",
    page: number = 1
  ) =>
    useQuery<{ accountCount: number; accounts: AdminAccount[] }>({
      queryKey: [
        "get-account",
        page,
        searchEmail,
        searchPermission,
        searchState,
      ],
      queryFn: () =>
        getAccounts({ page, searchEmail, searchPermission, searchState }),
    });

  const detailAccount = (accountId: bigint) =>
    useQuery({
      queryKey: ["detail-account", accountId],
      queryFn: () => getDetailAccount(accountId),
    });

  const { mutate: mutateUpdateDetail } = useMutation({
    mutationFn: updateDetailAccount,
  });

  return {
    accountList,
    detailAccount,
    mutateUpdateDetail,
  };
};

export default useAdmin;
