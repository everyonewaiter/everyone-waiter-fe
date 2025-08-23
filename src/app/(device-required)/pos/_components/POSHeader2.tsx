"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Icon from "@/components/common/Icon/Icon";
import useOverlay from "@/hooks/useOverlay";
import QueryProviders from "@/app/query-providers";
import POSHeader from "./POSHeader";
import SalesModal from "./modals/SalesModal";

export default function POSHeader2() {
  const navigate = useRouter();
  const pathname = usePathname();
  const isHistory = pathname?.includes("/history");

  const { open, close } = useOverlay();

  const handleOpenSales = () => {
    open(() => (
      <QueryProviders>
        <SalesModal close={close} />
      </QueryProviders>
    ));
  };

  const commonButtonProps = {
    className:
      "text-gray-0 font-regular flex flex-row gap-[10px] rounded-[12px] border border-gray-600 px-4 py-3 text-lg",
  };

  return (
    <POSHeader>
      <button
        type="button"
        className="text-gray-0 font-regular flex flex-row gap-[10px] rounded-[12px] border border-gray-600 px-4 py-3 text-lg"
        onClick={() => navigate.back()}
      >
        <Icon iconKey="arrow-turn-right" size={28} className="pb-0.5" />
        <span>돌아가기</span>
      </button>
      {isHistory ? (
        <button type="button" onClick={handleOpenSales} {...commonButtonProps}>
          <Icon iconKey="coin" size={28} className="pb-0.5" />
          <span>매출 확인</span>
        </button>
      ) : (
        <Link href="/pos/payments/history" {...commonButtonProps}>
          <Icon iconKey="file-check" size={28} className="pb-0.5" />
          <span>결제 내역</span>
        </Link>
      )}
    </POSHeader>
  );
}
