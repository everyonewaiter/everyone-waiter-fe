import dynamic from "next/dynamic";
import usePayment from "../../_queries/usePayment";
import usePos from "../../_queries/usePos";

const Alert = dynamic(() => import("@/components/common/Alert/Alert"), {
  ssr: false,
});

interface IProps {
  close: () => void;
  tableNo: number;
}

export default function ReceiptModal({ close, tableNo }: IProps) {
  const { printReceipt } = usePayment();
  const { activity, storeStatus } = usePos();
  const { data: activityData } = activity(tableNo);
  const { data: stores } = storeStatus;

  const handleAction = () => {
    printReceipt({
      activity: activityData!,
      stores: stores!,
      successHandler: () => close(),
    });
  };

  return (
    <Alert
      onAction={handleAction}
      onClose={close}
      buttonText="출력하기"
      buttonColor="black"
      noResponsive
    >
      <strong className="text-gray-0 text-xl font-semibold">
        영수증을 출력하시겠습니까?
      </strong>
    </Alert>
  );
}
