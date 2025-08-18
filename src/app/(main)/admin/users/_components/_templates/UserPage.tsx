"use client";

import { useEffect, useState } from "react";
import Paginations from "@/components/common/Pagination/Paginations";
import useDebounce from "@/hooks/useDebounce";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminQueries } from "../../../_queries/useAdmin";
import UsersContent from "../UsersContent";
import {
  TypeUserSearchForm,
  userSearchSchema,
} from "../../_schema/user.schema";

const permissionObj = {
  전체: "",
  사장님: "OWNER",
  사용자: "USER",
  관리자: "ADMIN",
};

const stateObj = {
  전체: "",
  활성화: "ACTIVE",
  비활성화: "INACTIVE",
};

export interface TypeActive {
  permission: string;
  subscription: string;
  storeAccepted: string;
  status: string;
}

export default function UserPage() {
  const form = useForm<TypeUserSearchForm>({
    mode: "onChange",
    resolver: zodResolver(userSearchSchema),
    defaultValues: {
      searchWord: "",
      active: {
        permission: null,
        subscription: null,
        storeAccepted: null,
        status: null,
      },
    },
  });
  const { watch } = form;
  const activePermission = watch("active.permission");
  const activeStatus = watch("active.status");
  const activeStoreAccepted = watch("active.storeAccepted");

  const [currentPage, setCurrentPage] = useState(1);

  const { debouncedValue } = useDebounce({
    searchWord: watch("searchWord"),
    delay: 300,
  });

  const getHasStoreValue = (value: string | null): boolean | null => {
    if (value === "Y") return true;
    if (value === "N") return false;
    return null;
  };

  const { data, refetch } = adminQueries.useAccount({
    email: debouncedValue,
    permission: permissionObj[
      activePermission as keyof typeof permissionObj
    ] as AccountPermission,
    state: stateObj[activeStatus as keyof typeof stateObj] as Status,
    hasStore: getHasStoreValue(activeStoreAccepted),
    page: currentPage,
  });

  useEffect(() => {
    refetch();
  }, [
    activePermission,
    activeStatus,
    activeStoreAccepted,
    debouncedValue,
    refetch,
  ]);

  return (
    <div className="flex h-full flex-col">
      <FormProvider {...form}>
        <UsersContent debouncedValue={debouncedValue} data={data?.content!} />
      </FormProvider>
      <Paginations
        size="lg:w-6 lg:h-6 md:w-5 md:h-5 hidden md:block"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        className="my-8"
        hasNext={data?.hasNext}
        hasPrevious={data?.hasPrevious}
        fastForwardTarget={data?.fastForwardPage}
        fastBackwardTarget={data?.fastBackwardPage}
      />
    </div>
  );
}
