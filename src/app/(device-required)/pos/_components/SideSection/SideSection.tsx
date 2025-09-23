import { useParams, useRouter } from "next/navigation";
import dynamic from "next/dynamic";
import QueryProviders from "@/app/query-providers";
import Button from "@/components/common/Button/Button";
import useOverlay from "@/hooks/useOverlay";
import useLeaveGuard from "@/hooks/useCheckLeave";
import getQueryClient from "@/app/get-query-client";
import { useRef } from "react";
import { useOrderStore } from "../../_hooks/useOrderStore";
import { useSelectItemStore } from "../../_hooks/useSelectItemStore";
import { orderQueries } from "../../_queries/useOrder";
import { posQueries } from "../../_queries/usePos";
import SideBottom from "./SideBottom";
import SideContents from "./SideContents";
import SideControl from "./SideControl";
import SideHeader from "./SideHeader";
import SideLayout from "./SideLayout";
import SidePayment from "./SidePayment";
import { posKeys } from "../../_queries/keys";

const MemoAlert = dynamic(() => import("../modals/MemoAlert"), {
  ssr: false,
});

export default function SideSection() {
  const bottomRef = useRef<HTMLDivElement>(null);
  const navigate = useRouter();

  const params = useParams();
  const tableNo = Number(params?.tableId as string);

  const { selectedOrder, selectedMenu, setSelectedOrder } =
    useSelectItemStore();
  const { orders } = useOrderStore();

  const { open, close } = useOverlay();

  const { data } = posQueries.useActivity(Number(tableNo));
  const updateOrder = posQueries.useUpdateOrder();
  const addDiscount = orderQueries.useAddDiscount();
  const cancel = orderQueries.useCancelOrder();
  const complete = orderQueries.useCompleteOrder();

  const handleAddMenu = () => {
    open(() => (
      <QueryProviders>
        <MemoAlert close={close} isOrder tableNo={Number(tableNo)} />
      </QueryProviders>
    ));
  };

  const handleTableComplete = () => {
    complete.mutate(
      { tableNo },
      { onSuccess: () => navigate.push("/pos/tables") }
    );
  };

  const handleCancelOrder = async () => {
    if (selectedOrder.length === 0) {
      // eslint-disable-next-line no-alert
      alert("삭제할 주문을 선택해주세요.");
      return;
    }

    const cancelPromises = selectedOrder.map((order) =>
      cancel.mutateAsync({
        tableNo,
        orderId: order.orderId,
      })
    );

    await Promise.all(cancelPromises).then(() => {
      setSelectedOrder([]);

      if (data?.orders.length === 0) {
        complete.mutate({ tableNo });
        navigate.push("/pos/tables");
      }
    });
  };

  const handleUpdateOrderedMenu = (type: "add" | "sub") => {
    if (selectedMenu.length === 0) {
      // eslint-disable-next-line no-alert
      alert("수정할 메뉴를 선택해주세요.");
      return;
    }

    updateOrder.mutate(
      {
        tableNo,
        body: {
          orders: selectedMenu.map((el) => ({
            orderId: el.orderId,
            orderMenus: [
              {
                orderMenuId: el.orderMenuId,
                quantity:
                  type === "add"
                    ? (el?.quantity ?? 0) + 1
                    : (el?.quantity ?? 0) - 1,
              },
            ],
          })),
        },
      },
      {
        onSuccess: () => {
          const queryClient = getQueryClient();
          queryClient.invalidateQueries({
            queryKey: posKeys.activity(data?.tableNo!),
          });

          if (!data?.orders?.length) {
            complete.mutate(
              { tableNo },
              { onSuccess: () => navigate.push("/pos/tables") }
            );
          }
        },
      }
    );
  };

  useLeaveGuard(orders.length > 0);

  return (
    <SideLayout className="flex-col">
      <SideHeader
        tableNo={Number(tableNo)}
        hasOrders={orders.length > 0}
        data={data!}
      />
      {!orders?.length && (!data?.orders || data?.orders === undefined) ? (
        <div className="center w-full flex-1 flex-col">
          생성된 주문이 없습니다.
        </div>
      ) : (
        <>
          <div className="">
            <SideControl
              orderType={data?.orderType!}
              onCancelOrder={handleCancelOrder}
              onUpdateOrder={handleUpdateOrderedMenu}
            />
            <SideContents tableNo={tableNo} />
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
                className="mt-8 flex h-[64px] w-full flex-1 rounded-xl px-8 text-xl"
                onClick={handleAddMenu}
              >
                주문 요청
              </Button>
            </div>
          )}
          {orders.length === 0 && data?.orders && (
            <div className="flex flex-col" ref={bottomRef}>
              <div className="mb-6 h-[2px] w-full bg-gray-600" />
              <SideBottom
                {...data}
                discount={data?.discount ?? 0}
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
