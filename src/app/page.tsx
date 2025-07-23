"use client";

import { useEffect } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { storesQueries } from "./(main)/(owner)/[id]/store/_queries/useStores";

export default function Page() {
  const { data, isLoading } = storesQueries.useStoresList();
  const firstStoreId = data?.stores?.[0]?.storeId;

  useEffect(() => {
    if (!isLoading) {
      if (!firstStoreId) redirect("/user");
      else redirect(`/${firstStoreId}`);
    }
  }, [isLoading, firstStoreId]);

  if (isLoading) {
    return (
      <div className="center bg-primary h-screen w-screen md:bg-white">
        <div className="animate-pulse">
          {/* PC용 로고 */}
          <Image
            src="/logo/logo-with-text.svg"
            alt="logo"
            priority
            width={300}
            height={300}
            className="hidden md:block md:h-[200px] md:w-[200px] lg:h-[300px] lg:w-[300px]"
          />
          {/* 모바일용 로고 */}
          <div className="relative block h-[160px] w-[160px] md:hidden">
            <Image
              src="/logo/logo-with-text-white.svg"
              alt="logo"
              priority
              fill
              className="object-contain"
            />
          </div>
        </div>
      </div>
    );
  }
}
