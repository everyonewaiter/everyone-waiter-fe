import Image from "next/image";
import { useRouter } from "next/navigation";

interface IProps {
  openMobileSidebar: () => void;
}

export default function Header({ openMobileSidebar }: IProps) {
  const navigate = useRouter();

  return (
    <header>
      <div className="hidden md:block md:px-6 md:pt-4 lg:px-15 lg:pt-10">
        <div className="flex w-full items-center justify-between md:mb-4 lg:mb-5">
          <button
            type="button"
            className="flex items-center md:gap-[13px] lg:gap-5"
            onClick={() => navigate.push("/")}
          >
            <Image
              src="/icons/logo/logo-medium.svg"
              alt="로고"
              width={60}
              height={60}
              className="md:h-10 md:w-10 lg:h-15 lg:w-15"
            />
            <Image
              src="/icons/logo/logo-text.svg"
              alt="로고 텍스트"
              width={141}
              height={25}
              className="md:h-4 md:w-[94px] lg:h-[25px] lg:w-[141px]"
            />
          </button>
        </div>
        <div className="h-[1px] bg-gray-500" />
      </div>
      <div className="flex h-[60px] items-center justify-center border-b border-b-gray-600 px-5 md:hidden">
        <div className="relative flex w-full items-center justify-center">
          <button
            type="button"
            className="absolute top-[50%] left-0 -translate-y-1/2 transform"
            onClick={openMobileSidebar}
          >
            <Image
              src="/icons/align.svg"
              alt="사이드바"
              width={24}
              height={24}
            />
          </button>
          <button
            type="button"
            className="mt-[1px] flex items-center gap-3"
            onClick={() => navigate.push("/")}
          >
            <Image
              src="/icons/logo/logo-medium.svg"
              alt="로고"
              width={24}
              height={24}
            />
            <Image
              src="/icons/logo/logo-text.svg"
              alt="로고 텍스트"
              width={106}
              height={19}
              className="mt-[1px]"
            />
          </button>
        </div>
      </div>
    </header>
  );
}
