import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon/Icon";
import { paymentTimeTranslate } from "@/constants/translates";
import cn from "@/lib/utils";
import useElapsedMinutes from "../../waiting/_hooks/useElapsedMinutes";

type IProps = POSTableList & {
  isMoving?: boolean;
  onClick?: () => void;
  hasAnimation?: boolean;
};

export default function TableBox({
  isMoving,
  onClick,
  hasAnimation,
  ...props
}: IProps) {
  const elapsed = useElapsedMinutes(props.orderedAt);

  const getChipColor = () => {
    if (props.hasOrder && props.orderType === "PREPAID") {
      return "!border-none !bg-[#2E8CFF1A] !text-[#2E8CFF]";
    }
    if (props.hasOrder && props.orderType === "POSTPAID") {
      return "!border-none !bg-[#F220201A] !text-[#F22020]";
    }
    return "";
  };

  return (
    <div
      role="button"
      tabIndex={0}
      className={cn(
        "flex aspect-[432/320] cursor-pointer flex-col justify-between rounded-3xl border-[2px] p-7 text-left",
        props.orderMenuCount > 0 ? "border-primary" : "border-gray-500",
        isMoving && hasAnimation ? "animate-wiggle" : ""
      )}
      onClick={onClick}
      onKeyDown={(e) => {
        if (isMoving && (e.key === "Enter" || e.key === " ")) {
          e.preventDefault();
          onClick?.();
        }
      }}
    >
      <div className="flex items-center justify-between">
        {props.orderType ? (
          <Button
            variant="default"
            className={cn("button-sm !rounded-3xl", getChipColor())}
          >
            {
              paymentTimeTranslate[
                props.orderType as keyof typeof paymentTimeTranslate
              ]
            }
          </Button>
        ) : (
          <Button color="grey" className="button-sm !rounded-3xl">
            대기
          </Button>
        )}
        <div className="flex flex-row gap-2">
          <Button
            color="grey"
            className="text-gray-0 !text-s font-regular flex h-9 flex-row gap-[6px] rounded-xl px-3 py-2"
          >
            <Icon iconKey="alarm" size={20} className="text-gray-0 h-5 w-5" />
            {props?.orderedAt?.split(" ")[1].slice(0, 5) || "00:00"}
          </Button>
          <Button
            color="grey"
            className="text-gray-0 !text-s font-regular flex h-9 flex-row gap-[6px] rounded-xl px-3 py-2"
          >
            <Icon
              iconKey="stopwatch"
              size={20}
              className="text-gray-0 h-5 w-5"
            />
            <span className="mr-3 w-[42px]">{elapsed || "00:00"}</span>
          </Button>
        </div>
      </div>
      <h1 className="font-gray-0 font-bold md:text-3xl lg:text-4xl">
        {props.tableNo}번 테이블
      </h1>
      <div className="flex flex-row gap-8">
        <div className="flex flex-[0.59] flex-col gap-[11px]">
          <span className="font-regular text-sm">주문한 메뉴</span>
          {props.orderMenuCount > 0 ? (
            <div className="flex items-end gap-1.5">
              <strong className="text-xl font-semibold">
                {props.orderMenuName}
              </strong>
              {props.orderMenuCount > 1 && (
                <span className="text-s mb-0.5">
                  외 {props.orderMenuCount - 1}개
                </span>
              )}
            </div>
          ) : (
            <strong className="text-xl">-</strong>
          )}
        </div>
        <div className="flex flex-[0.37] flex-col gap-[11px]">
          <span className="font-regular text-sm">총 주문금액</span>
          <strong className="text-xl font-semibold">
            {props.totalOrderPrice
              ? `${props.totalOrderPrice?.toLocaleString()}원`
              : "-"}
          </strong>
        </div>
      </div>
    </div>
  );
}
