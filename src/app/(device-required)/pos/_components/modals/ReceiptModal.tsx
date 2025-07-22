import dynamic from "next/dynamic";
import usePayment from "../../_queries/usePayment";
import { posQueries } from "../../_queries/usePos";

const Alert = dynamic(() => import("@/components/common/Alert/Alert"), {
  ssr: false,
});

interface IProps {
  close: () => void;
  tableNo: number;
  storeId: string;
}

export default function ReceiptModal({ close, tableNo, storeId }: IProps) {
  const { printReceipt } = usePayment();
  const { data: activityData } = posQueries.useActivity(tableNo);
  const { data: stores } = posQueries.useStoreInfo(storeId);

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
