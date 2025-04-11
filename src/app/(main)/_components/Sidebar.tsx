import Image from "next/image";

export default function Sidebar() {
  return (
    <div className="hidden w-[318px] py-8 pl-[60px] md:block">
      <aside className="h-full rounded-[28px] bg-white px-5 pt-8">
        <div className="flex items-center justify-center gap-[18px]">
          <Image
            src="/logo.svg"
            alt="모두의 웨이터 로고"
            width={40}
            height={40}
          />
          <h1 className="font-hakgyo text-primary text-2xl">모두의 웨이터</h1>
        </div>
      </aside>
    </div>
  );
}
