import dynamic from "next/dynamic";
import QueryProviders from "@/app/query-providers";
import Button from "@/components/common/Button/Button";
import useOverlay from "@/hooks/useOverlay";
import { posQueries } from "../../_queries/usePos";

const CancelAlert = dynamic(() => import("../modals/CancelAlert"), {
  ssr: false,
});

interface IProps {
  tableNo: number;
  hasOrders: boolean;
  data: PosTableActivity;
}

export default function SideHeader({ data, tableNo, hasOrders }: IProps) {
  const { data: activity } = posQueries.useActivity(tableNo);

  const { open, close } = useOverlay();

  const handleCancel = (
    type: "order-cancel" | "pay-cancel" | "order-reset"
  ) => {
    open(() => (
      <QueryProviders>
        <CancelAlert close={close} type={type} activityData={activity!} />
      </QueryProviders>
    ));
  };

  return (
    <header className="flex items-center justify-between">
      <strong className="text-gray-0 text-[28px] font-semibold">
        {tableNo}번 테이블 {hasOrders && "추가 주문 내역"}
      </strong>
      {!hasOrders && data && data.orderType === "PREPAID" && (
        <Button
          asChild={false}
          variant="outline"
          color="primary"
          className="button-lg !rounded-lg text-base !font-medium"
          onClick={() => handleCancel("pay-cancel")}
        >
          결제 취소
        </Button>
      )}
      {hasOrders && (
        <Button
          asChild={false}
          variant="outline"
          color="primary"
          className="button-lg !rounded-lg text-base !font-medium"
          onClick={() => handleCancel("order-reset")}
        >
          주문 초기화
        </Button>
      )}
      {data && data.orderType === "POSTPAID" && (
        <Button
          asChild={false}
          variant="outline"
          color="primary"
          className="button-lg !rounded-lg text-base !font-medium"
          onClick={() => handleCancel("order-cancel")}
        >
          전체 주문 취소
        </Button>
      )}
    </header>
  );
}
