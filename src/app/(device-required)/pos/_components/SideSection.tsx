import { MinusIcon, PlusIcon } from "lucide-react";
import { Fragment } from "react";
import { useParams } from "next/navigation";
import Button from "@/components/common/Button/Button";
import Icon from "@/components/common/Icon";
import { ScrollArea } from "@/components/common/ScrollArea";
import useOverlay from "@/hooks/use-overlay";
import QueryProviders from "@/app/query-providers";
import CancelAlert from "./modals/CancelAlert";
import AddDiscountAlert from "./modals/AddDiscountAlert";
import PayAlert from "./modals/PayAlert";
import MenuBox from "./MenuBox";
import SideLayout from "./SideLayout";
import usePos from "../_queries/usePos";
import useOrder from "../_queries/useOrder";
import useSelectedMenuStore from "../_hooks/useSelectedMenu";
import OrderBox from "./OrderBox";

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
  const params = useParams();
  const tableNo = params?.tableId as string;

  const cancelModal = useOverlay();
  const discountModal = useOverlay();
  const payModal = useOverlay();
  const { selectedMenus, addSelectedMenus, deleteSelectedMenus } =
    useSelectedMenuStore();

  const { activity } = usePos();
  const { data } = activity(Number(tableNo));
  const { order } = useOrder();

  const { addDiscount } = useOrder();

  const handleCancel = () => {
    cancelModal.open(() => (
      <QueryProviders>
        <CancelAlert
          close={cancelModal.close}
          tableNo={data?.tableNo!}
          orderId="1" // 미완성
        />
      </QueryProviders>
    ));
  };

  const handleDiscount = () => {
    discountModal.open(() => (
      <QueryProviders>
        <AddDiscountAlert
          close={discountModal.close}
          total={data?.totalOrderPrice!}
          onAction={(_, discount) => {
            addDiscount.mutate({
              body: { discountPrice: (data?.totalOrderPrice ?? 0) - discount },
              tableNo: Number(tableNo),
            });
          }}
        />
      </QueryProviders>
    ));
  };

  const handlePay = (type: "cash" | "credit-card") => {
    payModal.open(() => (
      <QueryProviders>
        <PayAlert close={payModal.close} type={type} />
      </QueryProviders>
    ));
  };

  const handleOrder = () => {
    order.mutate(
      {
        tableNo: Number(tableNo),
        memo: "",
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
        onSuccess: resetOrder,
      }
    );
  };

  return (
    <SideLayout>
      <div className="flex items-center justify-between">
        <strong className="text-gray-0 text-[28px] font-semibold">
          {tableNo}번 테이블 {orders.length > 0 && "추가 주문 내역"}
        </strong>
        {data && data.orderType === "PREPAID" && (
          <Button
            asChild={false}
            variant="outline"
            color="primary"
            className="button-lg !rounded-[8px] text-base !font-medium"
            onClick={handleCancel}
          >
            결제 취소
          </Button>
        )}
      </div>
      <div className="flex flex-1 flex-col">
        {data && (
          <div className="flex items-center justify-between">
            <div className="flex gap-3">
              <Button
                variant="outline"
                color="grey"
                className="button-xl !w-14 !rounded-[12px] border-gray-600 !px-0 !text-gray-300"
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
              >
                <Icon iconKey="trash" size={24} />
              </Button>
            )}
          </div>
        )}
        <ScrollArea className="mt-8 h-full w-full">
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
            : data?.orders?.map((item, index, arr) => (
                <Fragment key={item.orderId}>
                  <MenuBox
                    index={index}
                    orderMenus={item.orderMenus}
                    orderId={item.orderId}
                  />
                  {index < arr.length - 1 && (
                    <div className="my-8 h-[2px] w-full bg-gray-700" />
                  )}
                </Fragment>
              ))}
        </ScrollArea>
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
            onClick={handleOrder}
          >
            주문 요청
          </Button>
        </div>
      )}
      {orders.length === 0 && data && (
        <div className="flex flex-col">
          <div className="mb-8 h-[2px] w-full bg-gray-600" />
          <div className="flex items-center justify-between">
            <span className="font-regular text-xl text-gray-300">할인</span>
            <Button
              variant="outline"
              color="black"
              className="h-10 rounded-[8px] border border-[#4f4f4f] px-5"
              onClick={handleDiscount}
            >
              할인수단 {data.discount ? "수정" : "추가"}
            </Button>
          </div>
          <div className="mt-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center justify-between">
                <span className="font-regular text-lg text-gray-300">
                  총 주문 금액
                </span>
                <span className="text-xl">
                  {data.totalOrderPrice.toLocaleString()}원
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="font-regular text-lg text-gray-300">
                  할인된 금액
                </span>
                <span className="text-primary text-xl">
                  - {data.discount.toLocaleString()}원
                </span>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <strong className="text-2xl font-semibold">결제할 금액</strong>
              <strong className="text-4xl font-bold">
                {data.remainingPaymentPrice.toLocaleString()}원
              </strong>
            </div>
          </div>
          {data.orderType === "PREPAID" ? (
            <Button
              color="grey"
              className="mt-8 flex h-[64px] flex-1 rounded-[12px] px-8 text-xl"
            >
              테이블 완료
            </Button>
          ) : (
            <div className="mt-8 flex gap-3">
              <Button
                variant="outline"
                color="black"
                className="flex h-[64px] flex-1 rounded-[12px] px-8 text-xl"
                onClick={() => handlePay("cash")}
              >
                현금 결제
              </Button>
              <Button
                color="black"
                className="flex h-[64px] flex-1 rounded-[12px] px-8 text-xl"
                onClick={() => handlePay("credit-card")}
              >
                카드 결제
              </Button>
            </div>
          )}
        </div>
      )}
      {orders.length === 0 && !data && (
        <div className="center w-full flex-1 flex-col">
          생성된 주문이 없습니다.
        </div>
      )}
    </SideLayout>
  );
}
