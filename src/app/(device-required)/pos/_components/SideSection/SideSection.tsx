import { MinusIcon, PlusIcon } from "lucide-react";
import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon";
import SideLayout from "./SideLayout";
import usePos from "../../_queries/usePos";
import useOrder from "../../_queries/useOrder";
import { useMemoStore } from "../../_hooks/useMemoStore";
import SideHeader from "./SideHeader";
import SideBottom from "./SideBottom";
import SidePayment from "./SidePayment";
import SideContents from "./SideContents";

interface IProps {
  orders: {
    menuId: string;
    menuName: string;
    quantity: number;
    totalPrice: number;
    menuOptionGroups: OrderOptionGroups[];
  }[];
  resetOrder: () => void;
}

export default function SideSection({ orders, resetOrder }: IProps) {
  const navigate = useRouter();
  const params = useParams();
  const tableNo = params?.tableId as string;

  const [selectDeleteMenu, setSelectDeleteMenu] = useState<string>("");
  const [selectedOrder, setSelectedOrder] = useState<{ orderId: string }[]>([]);

  const { memo, resetMemo } = useMemoStore();

  const { activity } = usePos();
  const { data } = activity(Number(tableNo));
  const { order, addDiscount, complete } = useOrder();

  const handleOrder = () => {
    order.mutate(
      {
        tableNo: Number(tableNo),
        memo,
        orderMenus: orders.map((el) => ({
          menuId: el.menuId,
          quantity: el.quantity,
          menuOptionGroups: el.menuOptionGroups.map((g) => ({
            menuOptionGroupId: g.orderOptionGroupId,
            orderOptions: g.orderOptions,
          })),
        })),
      },
      {
        onSuccess: () => {
          resetOrder();
          resetMemo();
        },
      }
    );
  };

  // TODO: 오더 하나 삭제
  const handleCancelOrder = async () => {
    console.log(selectedOrder);
    // const cancelPromises = Object.keys(selectedOrder).map((orderId) =>
    //   cancel.mutateAsync({ tableNo: Number(tableNo), orderId })
    // );

    // await Promise.all(cancelPromises);
  };

  // TODO: 오더 메뉴 하나 삭제
  const handleCancelMenu = () => {
    console.log(selectDeleteMenu);
  };

  const handleTableComplete = () => {
    complete.mutate(
      { tableNo: Number(tableNo) },
      { onSuccess: () => navigate.push("/pos/tables") }
    );
  };

  return (
    <SideLayout>
      <SideHeader
        tableNo={Number(tableNo)}
        hasOrders={orders.length > 0}
        data={data!}
      />
      {(data?.posTableId || orders.length > 0) && (
        <div className="">
          {data && (
            <div className="flex items-center justify-between pb-8">
              <div className="flex gap-3">
                <Button
                  variant="outline"
                  color="grey"
                  className="button-xl !w-14 !rounded-[12px] border-gray-600 !px-0 !text-gray-300"
                  onClick={handleCancelMenu}
                >
                  <MinusIcon size={24} />
                </Button>
                <Button
                  variant="outline"
                  color="grey"
                  className="button-xl !w-14 !rounded-[12px] border-gray-600 !px-0 !text-gray-300"
                >
                  <PlusIcon size={24} />
                </Button>
              </div>
              {data.orderType === "POSTPAID" && (
                <Button
                  variant="outline"
                  color="grey"
                  className="button-xl !w-14 !rounded-[12px] border-gray-600 !px-0 !text-gray-300"
                  onClick={handleCancelOrder}
                >
                  <Icon iconKey="trash" size={24} />
                </Button>
              )}
            </div>
          )}
          <SideContents
            orders={orders}
            activityOrders={data?.orders!}
            menuSelection={{
              value: selectDeleteMenu,
              setValue: (value) => setSelectDeleteMenu(value),
            }}
            orderSelection={{
              value: selectedOrder,
              setValue: (value) => setSelectedOrder(value),
            }}
          />
        </div>
      )}
      {orders.length > 0 && (
        <div className="w-full">
          <div className="mb-8 h-[2px] w-full bg-gray-600" />
          <div className="flex items-center justify-between">
            <strong className="text-2xl font-semibold">주문 금액</strong>
            <strong className="text-4xl font-bold">
              {orders
                .map((el) => el.totalPrice)
                .reduce((a, b) => a + b)
                .toLocaleString()}
              원
            </strong>
          </div>
          <Button
            color="primary"
            className="mt-8 flex h-[64px] w-full flex-1 rounded-[12px] px-8 text-xl"
            onClick={handleOrder}
          >
            주문 요청
          </Button>
        </div>
      )}
      {orders.length === 0 && data && (
        <div className="flex flex-col">
          <div className="mb-8 h-[2px] w-full bg-gray-600" />
          <SideBottom
            {...data}
            onAddDiscount={(discount) => {
              addDiscount.mutate({
                body: {
                  discountPrice: (data?.totalOrderPrice ?? 0) - discount,
                },
                tableNo: Number(tableNo),
              });
            }}
          />
          <SidePayment onTableComplete={handleTableComplete} {...data} />
        </div>
      )}
      {orders.length === 0 && !data && (
        <div className="center flex-co w-full flex-1">
          생성된 주문이 없습니다.
        </div>
      )}
    </SideLayout>
  );
}
