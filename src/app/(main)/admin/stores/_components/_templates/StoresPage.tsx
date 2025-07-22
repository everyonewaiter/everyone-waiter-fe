"use client";

import { useEffect, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import Paginations from "@/components/common/Pagination/Paginations";
import { registerStateTranslate } from "@/constants/translates";
import PageTitle from "@/app/(main)/_components/PageTitle";
import useDebounce from "@/hooks/useDebounce";
import { adminQueries } from "../../../_queries/useAdmin";
import StoresContent from "../StoresContent";

export default function StoresPage() {
  const form = useForm({
    defaultValues: {
      searchWord: "",
      activeStatus: "전체",
      isChecked: false,
    },
  });
  const { watch } = form;
  const activeStatus = watch("activeStatus");
  const isChecked = watch("isChecked");

  const [currentPage, setCurrentPage] = useState(1);

  const { debouncedValue } = useDebounce({
    searchWord: watch("searchWord"),
    delay: 300,
  });

  const { data, refetch } = adminQueries.useStores(
    isChecked ? "" : debouncedValue,
    isChecked ? debouncedValue : "",
    activeStatus === "전체"
      ? null
      : (Object.keys(registerStateTranslate).find(
          (key) =>
            registerStateTranslate[key as RegisterStatus] === activeStatus
        ) as RegisterStatus),
    currentPage
  );

  useEffect(() => {
    refetch();
  }, [activeStatus, debouncedValue, refetch]);

  return (
    <div className="flex h-full flex-col">
      <PageTitle title="매장 등록 승인" />
      <FormProvider {...form}>
        <StoresContent data={data?.content!} />
      </FormProvider>
      <Paginations
        size="lg:w-6 lg:h-6 md:w-5 md:h-5 hidden md:block"
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        className="my-8"
        move={{
          fastbackward: {
            hasMore: data?.hasPrevious!,
            target: data?.fastBackwardPage!,
          },
          backward: { hasMore: data?.hasPrevious! },
          forward: { hasMore: data?.hasNext! },
          fastforward: {
            hasMore: data?.hasNext!,
            target: data?.fastForwardPage!,
          },
        }}
      />
    </div>
  );
}
