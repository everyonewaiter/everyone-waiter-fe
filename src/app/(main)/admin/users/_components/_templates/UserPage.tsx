"use client";

import { useEffect, useState } from "react";
import Paginations from "@/components/common/Pagination/Paginations";
import useDebounce from "@/hooks/useDebounce";
import PageTitle from "@/app/(main)/_components/PageTitle";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { adminQueries } from "../../../_queries/useAdmin";
import UsersContent from "../UsersContent";
import { TypeUserForm, userSchema } from "../../_schema/user.schema";

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
  const form = useForm<TypeUserForm>({
    mode: "onChange",
    resolver: zodResolver(userSchema),
    defaultValues: {
      searchWord: "",
      active: {
        permission: "전체",
        subscription: "전체",
        storeAccepted: "전체",
        status: "전체",
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
