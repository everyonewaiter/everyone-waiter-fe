import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon";
import Image from "next/image";

export default function NotFound() {
  return (
    <div className="center flex h-screen w-screen flex-col">
      <div className="flex w-full flex-col items-center gap-6 px-5">
        <Image
          src="/gif/error.gif"
          alt="잘못된 접근"
          width={140}
          height={140}
        />
        <h1 className="text-gray-0 text-2xl font-semibold whitespace-pre-line">
          정보를 불러올 수 없습니다.
        </h1>
      </div>
      <span className="font-regular mt-3 text-sm whitespace-pre-line text-gray-300">
        일시적인 오류가 발생했습니다. 다시 시도해 주세요.
      </span>
      <Button
        className="button-md text-gray-0 mt-6 flex !w-fit items-center gap-2 !pr-[20px] !pl-[18px]"
        color="grey"
      >
        <Icon iconKey="rotate" size={20} className="text-gray-0" />
        다시 시도
      </Button>
    </div>
  );
}
