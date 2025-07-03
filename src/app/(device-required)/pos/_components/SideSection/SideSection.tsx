import { useParams, useRouter } from "next/navigation";
import Button from "@/components/common/Button/Button";
import useOverlay from "@/hooks/use-overlay";
import QueryProviders from "@/app/query-providers";
import SideLayout from "./SideLayout";
import usePos from "../../_queries/usePos";
import useOrder from "../../_queries/useOrder";
import { useMemoStore } from "../../_hooks/useMemoStore";
import SideHeader from "./SideHeader";
import SideBottom from "./SideBottom";
import SidePayment from "./SidePayment";
import SideContents from "./SideContents";
import { useOrderStore } from "../../_hooks/useOrderStore";
import SideControl from "./SideControl";
import MemoAlert from "../modals/MemoAlert";
import { useSelectItemStore } from "../../_hooks/useSelectItemStore";

export default function SideSection() {
  const navigate = useRouter();
  const params = useParams();
  const tableNo = params?.tableId as string;

  const { selectedOrder } = useSelectItemStore();
  const { resetMemo } = useMemoStore();
  const { orders, resetOrders } = useOrderStore();

  const { open, close } = useOverlay();

  const { activity } = usePos();
  const { data } = activity(Number(tableNo));
  const { order, addDiscount, complete, cancel } = useOrder();

  const handleOrder = (memo: string) => {
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
          resetOrders();
          resetMemo();
          close();
        },
      }
    );
  };

  const handleAddMenu = () => {
    open(() => (
      <QueryProviders>
        <MemoAlert
          close={close}
          isOrder
          onOrder={handleOrder}
          tableNo={Number(tableNo)}
        />
      </QueryProviders>
    ));
  };

  const handleTableComplete = () => {
    complete.mutate(
      { tableNo: Number(tableNo) },
      { onSuccess: () => navigate.push("/pos/tables") }
    );
  };

  const handleCancelOrder = () => {
    cancel.mutate({
      tableNo: Number(tableNo),
      orderId: selectedOrder?.orderId as string,
    });
  };

  return (
    <SideLayout>
      <SideHeader
        tableNo={Number(tableNo)}
        hasOrders={orders.length > 0}
        data={data!}
      />
      {orders.length === 0 && !data && (
        <div className="center w-full flex-1 flex-col">
          생성된 주문이 없습니다.
        </div>
      )}
      {(orders.length || data?.orders) && (
        <>
          <div className="">
            <SideControl
              orderType={data?.orderType!}
              onCancelOrder={handleCancelOrder}
              onCancelMenu={() => {}}
            />
            <SideContents orders={orders} activityOrders={data?.orders!} />
          </div>
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
                onClick={handleAddMenu}
              >
                주문 요청
              </Button>
            </div>
          )}
          {orders.length === 0 && data?.orders && (
            <div className="flex flex-col">
              <div className="mb-8 h-[2px] w-full bg-gray-600" />
              <SideBottom
                {...data}
                onAddDiscount={(discount) => {
                  addDiscount.mutate({
                    body: {
                      discountPrice: discount,
                    },
                    tableNo: Number(tableNo),
                  });
                }}
              />
              <SidePayment onTableComplete={handleTableComplete} {...data} />
            </div>
          )}
        </>
      )}
    </SideLayout>
  );
}
