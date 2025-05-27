"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import Paginations from "@/components/common/Pagination/Paginations";
import Searchbar from "@/components/Searchbar";
import { useEffect, useState } from "react";
import useDebounce from "@/hooks/useDebounce";
import DropdownGroup from "./_components/DropdownGroup";
import UsersTable from "./_components/UsersTable";
import useAdmin from "../_hooks/useAdmin";

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

export default function Users() {
  const [searchWord, setSearchWord] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [active, setActive] = useState({
    permission: "",
    subscription: "",
    storeAccepted: "",
    status: "",
  });

  const { debouncedValue } = useDebounce({ searchWord, delay: 300 });
  const { accountListQuery } = useAdmin();
  const { data, refetch } = accountListQuery(
    debouncedValue,
    permissionObj[
      active.permission as keyof typeof permissionObj
    ] as Permission,
    stateObj[active.status as keyof typeof stateObj] as Status,
    currentPage
  );

  useEffect(() => {
    refetch();
  }, [active.permission, active.status, debouncedValue]);

  const submitHandler = () => {};

  return (
    <div className="h-full min-h-screen w-full overflow-y-scroll">
      <div className="mt-4 flex w-full px-5 md:hidden">
        <Searchbar
          searchWord={debouncedValue}
          setSearchWord={setSearchWord}
          onSubmit={submitHandler}
        />
      </div>
      <div className="px-5 md:px-0">
        <div className="-mx-5 mt-6 block overflow-x-auto px-5 [-ms-overflow-style:'none'] [scrollbar-width:'none'] md:hidden [&::-webkit-scrollbar]:hidden">
          <div className="flex w-max min-w-full items-center gap-2">
            <div className="flex items-center gap-2">
              <DropdownGroup active={active} setActive={setActive} />
            </div>
          </div>
        </div>
        <div className="mt-6 hidden items-center justify-between md:flex">
          <div className="flex gap-2">
            <DropdownGroup active={active} setActive={setActive} />
          </div>
          <div className="hidden md:flex">
            <Searchbar
              searchWord={searchWord}
              setSearchWord={setSearchWord}
              onSubmit={submitHandler}
            />
          </div>
        </div>
        <UsersTable data={data?.content!} />
        <Paginations
          size="lg:w-6 lg:h-6 md:w-5 md:h-5 hidden md:block"
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          className="mt-8"
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
    </div>
  );
}
