"use client";

import { useQuery } from "@tanstack/react-query";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useStore } from "zustand";
import dynamic from "next/dynamic";
import { getStoreList } from "@/app/(main)/(owner)/[id]/store/_api/stores.api";
import MENU_ITEMS from "@/constants/sidebarMenus";
import useAuthStore from "@/stores/useAuthStore";
import { getComparePath } from "@/utils/getPathname";
import cn from "@/lib/utils";
import Loading from "@/components/Loading";
import SidebarMenuItem from "../SidebarMenuItem";

const MainSelect = dynamic(() => import("../MainSelect"), {
  ssr: false,
});

interface IProps {
  onClose: () => void;
}

export default function MobileSidebarSection({ onClose }: IProps) {
  const navigate = useRouter();

  const { user } = useStore(useAuthStore, (state) => state);
  const permission = user?.permission || "OWNER";
  const pathname = usePathname();
  const comparePath = getComparePath(pathname, permission);

  const [init, setInit] = useState(false);
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
    enabled: permission === "OWNER",
  });

  useEffect(() => {
    if (storeList?.stores?.length) {
      setSelectedStore(storeList.stores[0]);
    }
  }, [storeList]);

  const isOwnerWithoutStore =
    permission === "OWNER" && storeList?.stores?.length === 0;

  const [isPending, startTransition] = useTransition();

  const handleClick = (href: string) => {
    startTransition(() => {
      if (permission === "OWNER") {
        navigate.push(`/${selectedStore.storeId}${href}`);
      } else {
        navigate.push(href);
      }
    });
  };

  useEffect(() => {
    if (isPending) {
      setInit(true);
    } else if (init) {
      onClose();
      setInit(false);
    }
  }, [isPending, init, onClose]);

  const handlePrefetchURL = (href: string) => {
    if (permission === "OWNER") {
      navigate.prefetch(`/${selectedStore.storeId}${href}`);
    } else {
      navigate.prefetch(href);
    }
  };

  const isActive = (href: string) => {
    if (href === "/") return comparePath === "/";
    return comparePath === href || comparePath.startsWith(`${href}/`);
  };

  const commonStyle =
    "bg-primary flex w-full items-center justify-between rounded-xl";

  return (
    <div className={`${isOwnerWithoutStore ? "md:hidden" : "md:block"}`}>
      {isPending && <Loading />}
      <nav>
        {permission === "OWNER" ? (
          <MainSelect
            value={selectedStore.name}
            onValueChange={(value) =>
              setSelectedStore(
                storeList?.stores?.find((el) => el.name === value)!
              )
            }
            triggerClassname="text-sm font-bold text-white"
            stores={storeList?.stores}
          />
        ) : (
          <div
            className={cn(
              commonStyle,
              "py-[12.5px] pl-4 lg:py-[14.5px] lg:pl-5"
            )}
          >
            <h1 className="text-[15px] font-bold text-white lg:text-[18px]">
              관리자
            </h1>
          </div>
        )}
        <ul className="relative">
          {MENU_ITEMS[permission]?.length > 1 && (
            <div className="absolute top-[18px] bottom-[18px] left-[11px] w-[2px] bg-gray-600" />
          )}
          {MENU_ITEMS[permission].map((item) => (
            <SidebarMenuItem
              key={item.href}
              {...item}
              active={isActive(item.href)}
              onClick={() => handleClick(item.href)}
              onPrefetchURL={() => handlePrefetchURL(item.href)}
              className="gap-[6px]"
            />
          ))}
        </ul>
      </nav>
    </div>
  );
}
