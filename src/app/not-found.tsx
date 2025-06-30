import Loading from "@/components/Loading";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="center h-screen w-screen flex-col gap-8">
      <Loading />
      <Image
        src="/images/not-found.svg"
        alt="존재하지 않는 페이지"
        width={588.88}
        height={182}
        priority
      />
      <span className="font-regular text-lg text-[#9C9FA2]">
        찾으시는 페이지가 존재하지 않습니다.
      </span>
    </div>
  );
}
