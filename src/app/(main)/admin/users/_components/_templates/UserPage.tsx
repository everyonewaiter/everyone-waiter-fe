"use client";

import { useEffect, useState } from "react";
import Paginations from "@/components/common/Pagination/Paginations";
import useDebounce from "@/hooks/useDebounce";
import PageTitle from "@/app/(main)/_components/PageTitle";
import { FormProvider, useForm } from "react-hook-form";
import { adminQueries } from "../../../_queries/useAdmin";
import UsersContent from "../UsersContent";

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

interface FormType {
  searchWord: string;
  active: TypeActive;
}

export default function UserPage() {
  const form = useForm<FormType>({
    mode: "onChange",
    defaultValues: {
      searchWord: "",
      active: {
        permission: "",
        subscription: "",
        storeAccepted: "",
        status: "",
      },
    },
  });
  const { watch } = form;
  const activePermission = watch("active.permission");
  const activeStatus = watch("active.status");

  const [currentPage, setCurrentPage] = useState(1);

  const { debouncedValue } = useDebounce({
    searchWord: watch("searchWord"),
    delay: 300,
  });

  const { data, refetch } = adminQueries.useAccount(
    debouncedValue,
    permissionObj[
      activePermission as keyof typeof permissionObj
    ] as AccountPermission,
    stateObj[activeStatus as keyof typeof stateObj] as Status,
    currentPage
  );

  useEffect(() => {
    refetch();
  }, [activePermission, activeStatus, debouncedValue, refetch]);

  return (
    <div className="flex h-full flex-col">
      <PageTitle title="회원 관리" />
      <FormProvider {...form}>
        <UsersContent debouncedValue={debouncedValue} data={data?.content!} />
      </FormProvider>
      <Paginations
        size="lg:w-6 lg:h-6 md:w-5 md:h-5 hidden md:block"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        className="my-8"
        move={{
          fastbackward: {
            hasMore: data?.hasPrevious!,
            target: data?.fastBackwardPage,
          },
          backward: { hasMore: data?.hasPrevious! },
          forward: { hasMore: data?.hasNext! },
          fastforward: {
            hasMore: data?.hasNext!,
            target: data?.fastForwardPage,
          },
        }}
      />
    </div>
  );
}
