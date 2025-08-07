import { PlusIcon } from "@/components/common/Icon/index";
import cn from "@/lib/utils";

interface IProps extends CustomOrder {
  onSelect: (checked: boolean) => void;
  select: boolean;
}

export default function OrderBox({ onSelect, select, ...props }: IProps) {
  return (
    <div className="flex w-full flex-col gap-2">
      <button
        type="button"
        className="flex w-full flex-col gap-2"
        onClick={() => onSelect(!select)}
      >
        <div
          className={cn(
            "rounded-[12px] border p-4",
            select ? "border-primary" : "border-gray-600"
          )}
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">{props.menuName}</span>
            <div className="flex items-center gap-4">
              <span className="text-right text-lg font-medium">
                {props.quantity}개
              </span>
            </div>
          </div>
          {props.menuOptionGroups?.length > 0 && (
            <div className="mt-2 flex flex-col gap-1">
              {props.menuOptionGroups.map((el) =>
                el.orderOptions.map((option) => (
                  <div
                    className="flex items-center justify-between"
                    key={`${el.orderOptionGroupId}-${el.name}`}
                  >
                    <span className="flex items-center gap-1 text-base font-medium text-[#2E7BB3]">
                      <PlusIcon size={18} color="#2E7BB3" strokeWidth={1} />
                      {option.name}
                    </span>
                    <span className="text-right text-base font-medium text-[#2E7BB3]">
                      {option.price ? `₩ ${option.price.toLocaleString()}` : ""}
                    </span>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      </button>
    </div>
  );
}
