import SideBarButton from "@/app/(main)/_components/SideBarButton";
import Image from "next/image";

export default function MobileHeader() {
  return (
    <header className="flex h-[60px] items-center border-b border-gray-600 bg-white px-5 md:hidden">
      <SideBarButton />
      <div className="flex w-full items-center justify-center gap-3">
        <Image
          src="/icons/logo/logo.svg"
          alt="모두의 웨이터 로고"
          width={24}
          height={24}
        />
        <h1 className="font-hakgyo text-primary text-lg">모두의 웨이터</h1>
      </div>
    </header>
  );
}
