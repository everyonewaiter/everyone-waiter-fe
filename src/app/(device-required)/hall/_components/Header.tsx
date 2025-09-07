"use client";

import { useRouter } from "next/navigation";
import Button from "@/components/common/Button/Button";
import Logo from "@/components/Logo";
import cn from "@/lib/utils";
import { useWaitingList } from "../../waiting/_queries/useWaitingList";

interface IProps {
  href?: string;
}

export default function Header({ href }: IProps) {
  const navigate = useRouter();
  const { count } = useWaitingList();

  return (
    <header className="flex w-full items-center justify-between rounded-4xl bg-white px-8 py-6">
      <button
        type="button"
        className={cn(
          "flex items-center gap-5",
          href ? "cursor-pointer" : "cursor-default"
        )}
        onClick={() => (href ? navigate.push(href!) : null)}
      >
        <Logo width={60} height={60} />
        <h1 className="font-hakgyo text-primary text-base lg:text-2xl">
          모두의 웨이터
        </h1>
      </button>
      <div className="relative">
        <Button
          color="grey"
          className="button-xl bg-gray-300 text-lg font-semibold text-white"
          onClick={() => navigate.push("/waiting")}
        >
          웨이팅 관리 이동
        </Button>
        {count > 0 && (
          <div className="bg-primary center absolute -top-5 -right-5 h-10 w-10 rounded-full text-xl font-semibold text-white">
            {count}
          </div>
        )}
      </div>
    </header>
  );
}
