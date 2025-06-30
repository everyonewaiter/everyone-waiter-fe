import QueryProviders from "@/app/query-providers";
import Button from "@/components/common/Button/Button";
import useOverlay from "@/hooks/use-overlay";
import CancelAlert from "../modals/CancelAlert";

interface IProps {
  tableNo: number;
  hasOrders: boolean;
  data: PosTableActivity;
}

export default function SideHeader({ data, tableNo, hasOrders }: IProps) {
  const { open, close } = useOverlay();

  const handleCancel = () => {
    open(() => (
      <QueryProviders>
        <CancelAlert
          close={close}
          tableNo={data?.tableNo!}
          orderId="1" // 미완성
        />
      </QueryProviders>
    ));
  };

  return (
    <header className="flex items-center justify-between">
      <strong className="text-gray-0 text-[28px] font-semibold">
        {tableNo}번 테이블 {hasOrders && "추가 주문 내역"}
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
      {data && data.orderType === "POSTPAID" && !data.totalPaymentPrice && (
        <Button
          asChild={false}
          variant="outline"
          color="primary"
          className="button-lg !rounded-[8px] text-base !font-medium"
          onClick={handleCancel}
        >
          전체 주문 취소
        </Button>
      )}
    </header>
  );
}
