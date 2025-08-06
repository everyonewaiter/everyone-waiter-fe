"use client";

import Spinner from "@/components/common/Spinner";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import MainSelect from "../MainSelect";
import SidebarMenu from "./SidebarMenu";
import { getStoreList } from "../../(owner)/[id]/store/_api/stores.api";

interface IProps {
  initialStoreId: string;
  role: AccountPermission;
}

export default function Navigation({ initialStoreId, role }: IProps) {
  const [selectedStoreId, setSelectedStoreId] = useState(initialStoreId);

  const { data: storeList } = useQuery({
    queryKey: ["store-list"],
    queryFn: getStoreList,
    enabled: role === "OWNER",
    staleTime: 1000 * 60,
  });

  useEffect(() => {
    if (storeList?.stores?.length && !selectedStoreId) {
      setSelectedStoreId(storeList.stores[0].storeId);
    }
  }, [storeList, selectedStoreId]);

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
          value={selectedStoreId}
          onValueChange={(value) => {
            setSelectedStoreId(value);
          }}
          triggerClassname="text-[15px] font-bold text-white md:py-[12.5px] md:pl-4 lg:py-[14.5px] lg:pl-5 lg:text-[18px]"
        />
      )}
      {role === "ADMIN" && (
        <div className="bg-primary flex w-full items-center justify-between rounded-xl py-[12.5px] pl-4 lg:py-[14.5px] lg:pl-5">
          <h1 className="text-[15px] font-bold text-white lg:text-[18px]">
            관리자
          </h1>
        </div>
      )}
      <SidebarMenu selectedStoreId={selectedStoreId} permission={role} />
    </nav>
  );
}
