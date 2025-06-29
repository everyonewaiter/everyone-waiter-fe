import { PlusIcon } from "lucide-react";
import Checkbox from "@/components/common/Checkbox";
import { useState } from "react";

interface IProps {
  orderMenus: TableOrderMenu[];
  index: number;
  orderId: string;
}

export default function MenuBox({ orderId, orderMenus, index }: IProps) {
  const [selectedOrder, setSelectedOrder] = useState<{ orderId: string }[]>([]);

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        <Checkbox
          className="h-6 w-6"
          checked={!!selectedOrder.find((v) => v.orderId === orderId)}
          onCheckedChange={() =>
            selectedOrder.find((v) => v.orderId === orderId)
              ? setSelectedOrder(
                  selectedOrder.filter((el) => el.orderId !== orderId)
                )
              : setSelectedOrder([...selectedOrder, { orderId }])
          }
        />
        <strong className="text-2xl font-semibold">{index + 1}</strong>
      </div>
      {orderMenus.map((menu) => (
        <div
          key={menu.orderMenuId}
          className="rounded-[12px] border border-gray-600 p-4"
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
        </div>
      ))}
    </div>
  );
}
