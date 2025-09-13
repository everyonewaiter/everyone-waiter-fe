import { Fragment } from "react";
import { ScrollArea } from "@/components/common/ScrollArea";
import cn from "@/lib/utils";
import useCheckedMenuStore from "../../_hooks/useCheckedMenu";
import { useSelectItemStore } from "../../_hooks/useSelectItemStore";
import getOrderKey from "../../_utils/get-order-key";
import MenuBox from "../MenuBox";
import OrderBox from "../OrderBox";

interface IProps {
  orders: {
    menuId: string;
    menuName: string;
    quantity: number;
    totalPrice: number;
    menuOptionGroups: OrderOptionGroups[];
  }[];
  activityOrders: TableOrder[];
}

export default function SideContents({ orders, activityOrders }: IProps) {
  const { checkedMenu, changeCheckedMenu } = useCheckedMenuStore();
  const { hasSelectedOrder, addSelectedOrder, removeSelectedOrder } =
    useSelectItemStore();

  return (
    <ScrollArea
      className={cn(
        "w-full",
        orders?.length > 0 ? "h-[calc(100dvh-458px)]" : "h-[calc(100dvh-602px)]"
      )}
    >
      {orders?.length > 0
        ? orders?.map((item, index) => (
            <div
              key={getOrderKey(item)}
              className={cn(index === 0 ? "" : "mt-3")}
            >
              <OrderBox
                onSelect={() =>
                  changeCheckedMenu(item.menuId, getOrderKey(item))
                }
                select={checkedMenu.key === getOrderKey(item)}
                {...item}
              />
            </div>
          ))
        : activityOrders?.map((item, index, arr) => (
            <Fragment key={item.orderId}>
              <MenuBox
                index={index}
                {...item}
                checked={hasSelectedOrder(item.orderId)}
                onCheckedChange={() => {
                  if (hasSelectedOrder(item.orderId)) {
                    removeSelectedOrder(item.orderId);
                  } else {
                    addSelectedOrder(item);
                  }
                }}
              />
              {index < arr.length - 1 && (
                <div className="my-8 h-[2px] w-full bg-gray-700" />
              )}
            </Fragment>
          ))}
    </ScrollArea>
  );
}
