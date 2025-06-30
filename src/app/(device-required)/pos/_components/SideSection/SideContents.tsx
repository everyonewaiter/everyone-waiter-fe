import { ScrollArea } from "@/components/common/ScrollArea";
import { Fragment } from "react";
import OrderBox from "../OrderBox";
import MenuBox from "../MenuBox";
import useSelectedMenuStore from "../../_hooks/useSelectedMenu";

interface IProps {
  orders: {
    menuId: string;
    menuName: string;
    quantity: number;
    totalPrice: number;
    menuOptionGroups: OrderOptionGroups[];
  }[];
  activityOrders: TableOrder[];
  menuSelection: {
    value: string;
    setValue: (value: string) => void;
  };
  orderSelection: {
    value: { orderId: string }[];
    setValue: (value: { orderId: string }[]) => void;
  };
}

export default function SideContents({
  orders,
  activityOrders,
  menuSelection,
  orderSelection,
}: IProps) {
  const { selectedMenus, addSelectedMenus, deleteSelectedMenus } =
    useSelectedMenuStore();

  return (
    <ScrollArea className="h-[calc(100dvh-602px)]">
      {orders?.length > 0
        ? orders?.map((item, index, arr) => (
            // eslint-disable-next-line react/no-array-index-key
            <Fragment key={item.menuId + index}>
              <OrderBox
                index={index}
                hasCheckbox
                orderOptionGroups={item.menuOptionGroups}
                onCheckedChange={() =>
                  selectedMenus.find((v) => v.id === item.menuId)
                    ? deleteSelectedMenus(item.menuId)
                    : addSelectedMenus(item.menuId)
                }
                checked={!!selectedMenus.find((v) => v.id === item.menuId)}
                menuName={item.menuName}
                quantity={item.quantity}
              />
              {index < arr.length - 1 && (
                <div className="my-8 h-[2px] w-full bg-gray-700" />
              )}
            </Fragment>
          ))
        : activityOrders?.map((item, index, arr) => (
            <Fragment key={item.orderId}>
              <MenuBox
                index={index}
                {...item}
                onDeleteMenu={(id) => menuSelection.setValue(id)}
                selectDeleteMenu={menuSelection.value}
                checked={
                  !!orderSelection.value.find((v) => v.orderId === item.orderId)
                }
                onCheckedChange={() =>
                  orderSelection.value.find((v) => v.orderId === item.orderId)
                    ? orderSelection.setValue(
                        orderSelection.value.filter(
                          (el) => el.orderId !== item.orderId
                        )
                      )
                    : orderSelection.setValue([
                        ...orderSelection.value,
                        { orderId: item.orderId },
                      ])
                }
              />
              {index < arr.length - 1 && (
                <div className="my-8 h-[2px] w-full bg-gray-700" />
              )}
            </Fragment>
          ))}
    </ScrollArea>
  );
}
