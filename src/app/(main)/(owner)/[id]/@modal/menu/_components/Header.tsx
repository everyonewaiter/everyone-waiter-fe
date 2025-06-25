import Icon from "@/components/common/Icon";
import { useRouter } from "next/navigation";

export default function Header() {
  const navigate = useRouter();

  return (
    <div className="mt-8 flex w-full justify-between md:mt-0">
      <div className="flex flex-col gap-1 lg:gap-3">
        <h1 className="text-gray-0 text-lg font-semibold lg:text-2xl">
          매장 정보
        </h1>
        <p className="font-regular md:text-s text-xs text-gray-300 lg:text-sm">
          메뉴의 세부 정보를 입력하고 옵션을 설정해 주세요.
        </p>
      </div>
      <Icon
        iconKey="close"
        size={32}
        className="h-6 w-6 text-black md:h-8 md:w-8"
        onClick={() => navigate.back()}
      />
    </div>
  );
}
