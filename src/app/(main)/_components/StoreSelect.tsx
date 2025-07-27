"use client";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/common/select";
import { useEffect } from "react";

interface IProps {
  storeList?: { storeId: string; name: string }[];
  selectedStoreId: string;
  setSelectedStoreId: (value: string) => void;
}

export default function StoreSelect({
  storeList,
  selectedStoreId,
  setSelectedStoreId,
}: IProps) {
  useEffect(() => {
    if (storeList?.length) {
      setSelectedStoreId(storeList[0].storeId);
    }
    // eslint-disable-next-line
  }, [storeList]);

  return (
    <Select value={selectedStoreId} onValueChange={setSelectedStoreId}>
      <SelectTrigger
        className="bg-primary flex w-full items-center justify-between rounded-xl text-[15px] font-bold text-white md:py-[12.5px] md:pl-4 lg:py-[14.5px] lg:pl-5 lg:text-[18px]"
        aria-label="매장 선택"
      >
        <SelectValue placeholder="매장 선택" />
      </SelectTrigger>
      <SelectContent>
        {storeList?.map((store) => (
          <SelectItem key={store.storeId} value={store.storeId}>
            {store.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}
