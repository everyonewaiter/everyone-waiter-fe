import Icon from "@/components/common/Icon/Icon";

interface IProps {
  onNavigate: () => void;
  isPage: boolean;
}

export default function Header({ onNavigate, isPage }: IProps) {
  return (
    <div className="mt-8 flex w-full justify-between md:mt-0">
      <div className="flex flex-col gap-1 lg:gap-3">
        <h1 className="text-gray-0 text-lg font-semibold lg:text-2xl">
          메뉴 상세
        </h1>
        <p className="font-regular md:text-s text-xs text-gray-300 lg:text-sm">
          메뉴의 세부 정보를 입력하고 옵션을 설정해 주세요.
        </p>
      </div>
      {!isPage && (
        <button type="button">
          <Icon
            iconKey="close"
            size={32}
            className="h-6 w-6 text-black md:h-8 md:w-8"
            onClick={onNavigate}
          />
        </button>
      )}
    </div>
  );
}
