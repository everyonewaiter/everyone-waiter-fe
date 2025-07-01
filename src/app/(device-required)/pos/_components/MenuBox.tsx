import { PlusIcon } from "lucide-react";
import Checkbox from "@/components/common/Checkbox";
import cn from "@/lib/utils";

interface IProps extends TableOrder {
  index: number;
  onSelect?: (menuid: TableOrderMenu | null) => void;
  select?: string;
  checked?: boolean;
  onCheckedChange?: () => void;
}

export default function MenuBox({
  index,
  onSelect,
  select,
  checked,
  onCheckedChange,
  ...props
}: IProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <Checkbox
          className="h-6 w-6"
          checked={checked}
          onCheckedChange={onCheckedChange}
        />
        <strong className="text-2xl font-semibold">{index + 1}</strong>
      </div>
      {props.orderMenus.map((menu) => (
        <button
          type="button"
          key={menu.orderMenuId}
          className={cn(
            "rounded-[12px] border p-4",
            select === menu.orderMenuId ? "border-primary" : "border-gray-600"
          )}
          onClick={() =>
            select === menu.orderMenuId ? onSelect?.(null) : onSelect?.(menu)
          }
        >
          <div className="flex items-center justify-between">
            <span className="text-lg font-medium">{menu.name}</span>
            <span className="text-right text-lg font-medium">
              {menu.quantity}개
            </span>
          </div>
          <div className="mt-2 flex flex-col gap-1">
            {menu.orderOptionGroups.map((el) =>
              el.orderOptions.map((option: OrderOptions) => (
                <div
                  className="flex items-center justify-between"
                  key={`${el.orderOptionGroupId}-${el.name}`}
                >
                  <span className="flex items-center gap-1 text-base font-medium text-[#2E7BB3]">
                    <PlusIcon size={18} color="#2E7BB3" strokeWidth={1} />
                    {el.name}
                  </span>
                  <span className="text-right text-base font-medium text-[#2E7BB3]">
                    {option.name}
                  </span>
                </div>
              ))
            )}
          </div>
        </button>
      ))}
    </div>
  );
}
