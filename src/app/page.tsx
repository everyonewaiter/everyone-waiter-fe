"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { redirect } from "next/navigation";
import { storesQueries } from "./(main)/(owner)/[id]/store/_queries/useStores";

export default function Page() {
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const t = document.cookie
      .split("; ")
      .find((row) => row.startsWith("accessToken="))
      ?.split("=")[1];

    if (!t) {
      redirect("/login");
    } else {
      setToken(t);
    }
  }, []);

  const { data, isLoading } = storesQueries.useStoresList(!!token);

  const firstStoreId = data?.stores?.[0]?.storeId;

  useEffect(() => {
    if (!isLoading && token) {
      if (!firstStoreId) redirect("/user");
      else redirect(`/${firstStoreId}`);
    }
  }, [isLoading, token, firstStoreId]);

  if (isLoading) {
    return (
      <div className="center bg-primary h-screen w-screen md:bg-white">
        <div className="animate-pulse">
          <Image
            src="/logo/logo-with-text.svg"
            alt="logo"
            priority
            width={300}
            height={300}
            className="hidden md:block md:h-[200px] md:w-[200px] lg:h-[300px] lg:w-[300px]"
          />
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

  return null;
}
