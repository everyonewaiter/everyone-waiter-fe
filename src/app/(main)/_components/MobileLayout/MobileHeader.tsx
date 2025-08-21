import SideBarButton from "@/app/(main)/_components/Sidebar/SideBarButton";
import Image from "next/image";
import Link from "next/link";

interface IProps {
  href?: string;
}

export default function MobileHeader({ href }: IProps) {
  return (
    <header className="sticky top-0 z-[9998] h-[60px] border-b border-gray-600 bg-white px-5 md:hidden">
      <div className="flex h-full items-center justify-center">
        {href !== "/main" && <SideBarButton />}
        <Link
          href={href || "/"}
          className="flex w-full items-center justify-center gap-3"
        >
          <Image src="/logo/logo.svg" width={24} height={24} alt="로고" />
          <h1 className="font-hakgyo text-primary text-lg">모두의 웨이터</h1>
        </Link>
      </div>
    </header>
  );
}
