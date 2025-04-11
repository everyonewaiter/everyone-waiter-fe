import { Button, ButtonColors } from "@/components/common/Button";
import useOverlay from "@/hooks/use-overlay";
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
  width,
}: {
  children: React.ReactNode;
  width: string;
}) {
  return (
    <div className="text-gray-0 text-center text-base" style={{ width }}>
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
      className="flex h-[64px] w-full items-center justify-center border-b border-b-gray-600"
      role="button"
      tabIndex={0}
      onClick={handleOpenModal}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleOpenModal();
        }
      }}
    >
      <DataCell width="120px">{item.id}</DataCell>
      <DataCell width="482px">{item.date}</DataCell>
      <DataCell width="482.67px">{item.store}</DataCell>
      <DataCell width="168px">
        <Button
          color={item.status as ButtonColors}
          className="font-regular h-[37px] w-[65px] text-sm"
        >
          {STATUS_COLORS[item.status as keyof typeof STATUS_COLORS]}
        </Button>
      </DataCell>
      <DataCell width="482.67px">{item.reason}</DataCell>
    </div>
  );
}
