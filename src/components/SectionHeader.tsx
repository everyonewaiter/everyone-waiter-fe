import Image from "next/image";
import { useState } from "react";
import InfoPopup from "./InfoPopup";

export default function SectionHeader({ title }: { title: string }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="mx-5 mt-6 flex items-center justify-between border-b border-b-gray-500 pb-2 md:mx-0 md:mt-0 lg:pb-5">
      <h1 className="text-gray-0 text-lg font-semibold md:text-base md:font-bold lg:text-[28px]">
        {title}
      </h1>
      <button
        type="button"
        className="center relative h-8 w-8 rounded-[12px] border border-gray-400 lg:h-12 lg:w-12 lg:rounded-[16px]"
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Image
          src="/icons/user.svg"
          alt="사이드 메뉴"
          width={24}
          height={24}
          className="md:h-6 md:w-6 lg:h-8 lg:w-8"
        />
        {isOpen && <InfoPopup close={() => setIsOpen(false)} />}
      </button>
    </header>
  );
}
