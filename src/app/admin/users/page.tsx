"use client";

/* eslint-disable react-hooks/exhaustive-deps */
import Paginations from "@/components/common/Pagination/Paginations";
import Searchbar from "@/components/Searchbar";
import SectionHeader from "@/components/SectionHeader";
import { useEffect, useState } from "react";
import useAdmin from "@/hooks/useAdmin";
import useDebounce from "@/hooks/useDebounce";
import DropdownGroup from "./_components/DropdownGroup";
import UsersTable from "./_components/UsersTable";

const permissionObj = {
  전체: "",
  사장님: "OWNER",
  사용자: "USER",
  관리자: "ADMIN",
};

const stateObj = {
  전체: "",
  활성화: "ACTIVE",
  비활성화: "INActive",
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
  const { accountList } = useAdmin();
  const { data, refetch } = accountList(
    debouncedValue,
    permissionObj[
      active.permission as keyof typeof permissionObj
    ] as TPermission,
    stateObj[active.status as keyof typeof stateObj] as TStatus,
    currentPage
  );

  useEffect(() => {
    refetch();
  }, [active.permission, active.status, debouncedValue]);

  const submitHandler = () => {};

  return (
    <div className="h-full min-h-screen w-full overflow-y-scroll">
      <SectionHeader title="회원 관리" />
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
        <UsersTable data={data?.accounts!} />
        <Paginations
          size="lg:w-6 lg:h-6 md:w-5 md:h-5 hidden md:block"
          totalPages={1}
          currentPage={currentPage}
          onSetCurrentPage={setCurrentPage}
          className="mt-8"
        />
      </div>
    </div>
  );
}
