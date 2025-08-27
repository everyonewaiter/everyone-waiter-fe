import Image from "next/image";

export default function FirstLoading() {
  return (
    <div className="center bg-primary h-dvh w-dvw md:bg-white">
      <div className="animate-pulse">
        <Image
          src="/logo/logo-with-text.svg"
          alt="logo"
          priority
          width={300}
          height={300}
          className="hidden md:block md:h-[200px] md:w-[200px] lg:h-[300px] lg:w-[300px]"
        />
        <div className="relative block h-[160px] w-[160px] md:hidden">
          <Image
            src="/logo/logo-with-text-white.svg"
            alt="logo"
            priority
            fill
            className="object-contain"
          />
        </div>
      </div>
    </div>
  );
}
