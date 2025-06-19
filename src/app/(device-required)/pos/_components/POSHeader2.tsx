"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import Icon from "@/components/common/Icon";
import POSHeader from "./POSHeader";

export default function POSHeader2() {
  const navigate = useRouter();
  const pathname = usePathname();
  const isHistory = pathname.split("/").at(-1) === "history";

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
      <Link
        href={`/pos/payments/${isHistory ? "/sales" : "history"}`}
        className="text-gray-0 font-regular flex flex-row gap-[10px] rounded-[12px] border border-gray-600 px-4 py-3 text-lg"
      >
        <Icon
          iconKey={isHistory ? "coin" : "file-check"}
          size={28}
          className="pb-0.5"
        />
        <span>{isHistory ? "매출 확인" : "결제 내역"}</span>
      </Link>
    </POSHeader>
  );
}
