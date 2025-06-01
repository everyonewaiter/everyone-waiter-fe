"use client";

import { useRouter } from "next/navigation";
import QueryProviders from "@/app/query-providers";
import Icon from "@/components/common/Icon";
import useOverlay from "@/hooks/use-overlay";
import { Fragment } from "react";
import MemoAlert from "./modals/MemoAlert";
import ResendAlert from "./modals/ResendAlert";

const FLOATING_ITEMS = [
  {
    label: "좌석이동",
    icon: "rotate",
  },
  {
    label: "메모",
    icon: "book",
  },
  {
    label: "주방 재전송",
    icon: "send",
  },
  {
    label: "테이블 목록으로 이동",
    icon: "arrow-turn-right",
  },
  {
    label: "저장하기",
    icon: "save",
  },
];

export default function Floating() {
  const navigate = useRouter();
  const { open, close } = useOverlay();

  const handleAction = (type: string) => {
    if (type === "arrow-turn-right") navigate.push("/pos/tables");
    else if (type === "rotate") navigate.push("/pos/tables?move=true");
    else {
      open(() => (
        <QueryProviders>
          {type === "book" && <MemoAlert close={close} />}
          {type === "send" && <ResendAlert close={close} />}
        </QueryProviders>
      ));
    }
  };

  return (
    <aside className="shadow-floating font-regular text-gray-0 absolute bottom-7 left-1/2 flex h-[76px] w-[885px] -translate-x-1/2 flex-row rounded-[40px] bg-white px-10 py-6 text-xl">
      {FLOATING_ITEMS.map((item, index, arr) => (
        <Fragment key={item.label}>
          <button
            type="button"
            className="flex items-center gap-2"
            onClick={() => handleAction(item.icon)}
          >
            <Icon iconKey={item.icon} className="text-gray-0" />
            <span>{item.label}</span>
          </button>
          {index < arr.length - 1 && (
            <div className="mx-5 mt-1.5 h-5 w-px bg-gray-600" />
          )}
        </Fragment>
      ))}
    </aside>
  );
}
