"use client";

import { useRouter } from "next/navigation";
import useEscapeKey from "@/hooks/useEscapeKey";
import useOutsideClick from "@/hooks/useOutSideClick";
import { useRef } from "react";
import { X as CloseIcon } from "lucide-react";
import Image from "next/image";
import useStores from "@/app/stores/_hooks/useStores";
import { useAccount } from "@/hooks/store/useAccount";
import MobileSidebarSection from "./MobileSidebarSection";

interface IProps {
  onClose: () => void;
}

export default function MobileSidebar({ onClose }: IProps) {
  const navigate = useRouter();
  const ref = useRef<HTMLDivElement>(null);

  const { permission } = useAccount();
  const { acceptedStoresListQuery } = useStores();
  const { data } = acceptedStoresListQuery(true);

  useOutsideClick({ ref, handler: onClose });
  useEscapeKey({ handler: onClose });

  return (
    <div className="bg-opacity-100 fixed inset-0 z-[9999] flex backdrop-blur-sm md:hidden">
      <aside
        ref={ref}
        className="relative flex h-screen w-[284px] flex-col overflow-auto rounded-tr-[10px] rounded-br-[10px] bg-white stroke-gray-600 px-4"
      >
        <div className="flex w-full items-center justify-between pt-5 pb-4">
          <button
            type="button"
            className="flex items-center gap-3"
            onClick={() => {
              navigate.push("/");
              onClose();
            }}
          >
            <Image
              src="/icons/logo/logo-medium.svg"
              alt="모두의 웨이터 로고"
              width={40}
              height={40}
            />
            <Image
              src="/icons/logo/logo-text.svg"
              alt="모두의 웨이터 텍스트"
              width={106}
              height={19}
            />
          </button>
          <button type="button" onClick={onClose}>
            <CloseIcon color="#222" width={24} height={24} strokeWidth="1.5" />
          </button>
        </div>
        <div className="mb-4 h-[1px] bg-gray-600" />
        {permission !== "USER" && (
          <div className="flex flex-col gap-5">
            {data?.stores.map((item) => (
              <MobileSidebarSection
                key={item.storeId}
                onClose={onClose}
                {...item}
              />
            ))}
          </div>
        )}
        {permission === "ADMIN" && (
          <MobileSidebarSection onClose={onClose} name="모두의 웨이터" />
        )}
      </aside>
    </div>
  );
}
