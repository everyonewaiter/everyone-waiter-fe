import Image from "next/image";

export default function Splash({
  fadeOut,
  duration,
}: {
  fadeOut: boolean;
  duration: number;
}) {
  return (
    <div
      className={`bg-primary ${fadeOut ? "opacity-0" : "opacity-100"} hidden h-screen w-screen items-center justify-center duration-${duration} fixed sm:flex`}
    >
      <Image
        src="/images/logo-with-text-white.svg"
        alt="splash"
        width={160}
        height={97}
      />
    </div>
  );
}
