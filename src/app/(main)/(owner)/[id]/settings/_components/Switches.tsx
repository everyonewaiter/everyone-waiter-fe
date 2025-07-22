import { Switch } from "@radix-ui/react-switch";

interface IProps {
  showMenuPopup?: boolean;
  showOrderTotalPrice?: boolean;
  onShowPopup: (value: boolean) => void;
  onShowPrice: (value: boolean) => void;
}

export default function Switches({
  showMenuPopup,
  showOrderTotalPrice,
  onShowPopup,
  onShowPrice,
}: IProps) {
  return (
    <>
      <div className="flex w-full items-center">
        <span className="flex-1 text-sm">손님 테이블 메뉴 팝업창 띄우기</span>
        <Switch checked={showMenuPopup} onCheckedChange={onShowPopup} />
      </div>
      <div className="flex w-full items-center">
        <span className="flex-1 text-sm">
          손님 테이블 주문 내역에서 총 주문금액 표시하기
        </span>
        <Switch checked={showOrderTotalPrice} onCheckedChange={onShowPrice} />
      </div>
    </>
  );
}
