import SideBarButton from "@/app/(main)/_components/Sidebar/SideBarButton";
import Logo from "@/components/Logo";

export default function MobileHeader() {
  return (
    <header className="sticky top-0 z-50 h-[60px] border-b border-gray-600 bg-white px-5 md:hidden">
      <div className="flex h-full items-center justify-center">
        <SideBarButton />
        <div className="flex w-full items-center justify-center gap-3">
          <Logo width={24} height={24} />
          <h1 className="font-hakgyo text-primary text-lg">모두의 웨이터</h1>
        </div>
      </div>
    </header>
  );
}
