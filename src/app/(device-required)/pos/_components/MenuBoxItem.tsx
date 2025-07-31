import { PlusIcon } from "@/components/common/Icon/index";

interface IProps {
  name: string;
  quantity: number;
  orderOptionGroups: OrderOptionGroups[];
}

export default function MenuBoxItem({ ...menu }: IProps) {
  return (
    <>
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
              key={`${menu.name}-${el.orderOptionGroupId}-${option.name}`}
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
    </>
  );
}
