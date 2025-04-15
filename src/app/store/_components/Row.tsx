import { Button, ButtonColors } from "@/components/common/Button";
import useOverlay from "@/hooks/use-overlay";
import cn from "@/lib/utils";
import { TABLE_HEADER } from "@/app/stores/page";
import StoreApplicationModal from "./modals/StoreApplicationModal";
import PendingAcceptModal from "./modals/PendingAcceptModal";

export const STATUS_COLORS = {
  accepted: "접수",
  rejected: "반려",
  succeed: "승인",
  "re-accepted": "재접수",
};

function DataCell({
  children,
  className,
}: {
  children: React.ReactNode;
  className: string;
}) {
  return (
    <div
      className={cn(
        "text-gray-0 text-s font-regular text-center lg:text-base",
        className
      )}
    >
      {children}
    </div>
  );
}

interface IProps {
  id: number;
  date: number;
  store: string;
  status: keyof typeof STATUS_COLORS;
  reason: string;
  index: number;
}

export default function Row({ index, ...item }: IProps) {
  const { open, close } = useOverlay();

  const handleOpenModal = () => {
    if (item.status === "rejected") {
      open(() => <StoreApplicationModal close={close} />);
    } else if (item.status === "accepted") {
      open(() => <PendingAcceptModal close={close} />);
    }
  };

  return (
    <div
      className="flex w-full items-center justify-center border-b border-b-gray-600 md:h-10 lg:h-[64px]"
      role="button"
      tabIndex={0}
      onClick={handleOpenModal}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleOpenModal();
        }
      }}
    >
      <DataCell className={`${TABLE_HEADER["No."]}`}>{item.id}</DataCell>
      <DataCell className={`${TABLE_HEADER["신청일"]}`}>{item.date}</DataCell>
      <DataCell className={`${TABLE_HEADER["상호명"]}`}>{item.store}</DataCell>
      <DataCell className={`${TABLE_HEADER["상태"]}`}>
        <Button
          color={item.status as ButtonColors}
          className={cn(
            "lg:font-regular lg:h-[37px] lg:px-5 lg:py-2 lg:text-sm",
            "md:h-[26px]",
            "h-5 rounded-[6px] px-3 py-1 text-xs font-semibold text-white"
          )}
        >
          {STATUS_COLORS[item.status as keyof typeof STATUS_COLORS]}
        </Button>
      </DataCell>
      <DataCell className={`${TABLE_HEADER["사유"]}`}>{item.reason}</DataCell>
    </div>
  );
}
