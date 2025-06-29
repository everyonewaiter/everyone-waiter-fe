import Checkbox from "@/components/common/Checkbox";
import { PlusIcon } from "lucide-react";

interface IProps {
  index: number;
  hasCheckbox?: boolean;
  onCheckedChange: (checked: boolean) => void;
  checked: boolean;
  menuName: string;
  quantity: number;
  orderOptionGroups: OrderOptionGroups[];
}

export default function OrderBox({
  index,
  hasCheckbox,
  onCheckedChange,
  checked,
  menuName,
  quantity,
  orderOptionGroups,
}: IProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {hasCheckbox && (
          <Checkbox
            className="h-6 w-6"
            checked={checked}
            onCheckedChange={onCheckedChange}
          />
        )}
        <strong className="text-2xl font-semibold">{index + 1}</strong>
      </div>
      <div className="rounded-[12px] border border-gray-600 p-4">
        <div className="flex items-center justify-between">
          <span className="text-lg font-medium">{menuName}</span>
          <span className="text-right text-lg font-medium">{quantity}개</span>
        </div>
        <div className="mt-2 flex flex-col gap-1">
          {orderOptionGroups.map((el) =>
            el.orderOptions.map((option) => (
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
      </div>
    </div>
  );
}
