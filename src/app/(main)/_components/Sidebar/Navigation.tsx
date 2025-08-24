"use client";

import Spinner from "@/components/common/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import MainSelect from "../MainSelect";
import SidebarMenu from "./SidebarMenu";
import { getStoreList } from "../../(owner)/[id]/store/_api/stores.api";

interface IProps {
  role: AccountPermission;
}

export default function Navigation({ role }: IProps) {
  const navigate = useRouter();
  const pathname = usePathname();

  const [selectedStore, setSelectedStore] = useState<{
    name: string;
    storeId: string;
  }>({
    name: "",
    storeId: "",
  });

  const { data: storeList } = useQuery({
    queryKey: ["store-list"],
    queryFn: () => getStoreList(),
    enabled: role === "OWNER",
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    if (!storeList?.stores?.length) return;
    const currentId = pathname.split("/").filter(Boolean)[0];
    const matched = storeList.stores.find((el) => el.storeId === currentId);
    setSelectedStore(matched ?? storeList.stores[0]);
  }, [storeList, pathname]);

  return (
    <nav>
      {role === "OWNER" && !storeList && (
        <div className="bg-primary flex w-full items-center justify-center rounded-xl md:h-12 lg:h-14">
          <Spinner />
        </div>
      )}
      {role === "OWNER" && storeList && (
        <MainSelect
          stores={storeList?.stores}
          value={selectedStore.name}
          onValueChange={(value) => {
            const store = storeList.stores.find((el) => el.name === value);
            setSelectedStore(store!);
            const p = pathname.split("/");
            navigate.push(`/${store?.storeId}/${p.slice(2).join("/")}`);
          }}
          triggerClassname="text-[15px] font-bold text-white md:py-[12.5px] md:pl-4 lg:py-[14.5px] lg:pl-5 lg:text-lg"
        />
      )}
      {role === "ADMIN" && (
        <div className="bg-primary flex w-full items-center justify-between rounded-xl py-[12.5px] pl-4 lg:py-[14.5px] lg:pl-5">
          <h1 className="text-[15px] font-bold text-white lg:text-lg">
            관리자
          </h1>
        </div>
      )}
      <SidebarMenu selectedStoreId={selectedStore.storeId} permission={role} />
    </nav>
  );
}
