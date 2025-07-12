import Image from "next/image";
import SideBarButton from "@/app/(main)/_components/SideBarButton";

export default function MobileHeader() {
  return (
    <header className="sticky top-0 z-50 h-[60px] border-b border-gray-600 bg-white px-5 md:hidden">
      <div className="flex h-full items-center justify-center">
        <SideBarButton />
        <div className="flex w-full items-center justify-center gap-3">
          <Image
            src="/logo/logo.svg"
            alt="모두의 웨이터 로고"
            width={24}
            height={24}
            priority
          />
          <h1 className="font-hakgyo text-primary text-lg">모두의 웨이터</h1>
        </div>
      </div>
    </header>
  );
}
