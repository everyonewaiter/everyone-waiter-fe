/* eslint-disable jsx-a11y/no-static-element-interactions */
import { Button } from "@/components/common/Button";
import cn from "@/lib/utils";
import useOverlay from "@/hooks/use-overlay";
import { STATUS_COLORS } from "./Row";
import StoreApplicationModal from "./modals/StoreApplicationModal";
import PendingAcceptModal from "./modals/PendingAcceptModal";

interface IProps {
  id: number;
  date: number;
  store: string;
  status: keyof typeof STATUS_COLORS;
  reason: string;
}

export default function MobileTableItem({ ...item }: IProps) {
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
      className="w-[320px] cursor-pointer rounded-[16px] border border-gray-600"
      onClick={handleOpenModal}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleOpenModal();
        }
      }}
    >
      {Object.keys(item).map((key) => (
        <div key={key} className="flex h-12 w-full">
          <div className="text-s text-gray-0 center w-[140px] bg-gray-700 font-medium">
            {key}
          </div>
          <div className="text-s text-gray-0 center w-[180px] font-medium">
            {key === "status" ? (
              <Button
                color={item.status}
                className={cn(
                  "lg:font-regular lg:h-[37px] lg:px-5 lg:py-2 lg:text-sm",
                  "md:h-[26px]",
                  "h-5 rounded-[6px] px-3 py-1 text-xs font-semibold text-white"
                )}
              >
                {STATUS_COLORS[item.status as keyof typeof STATUS_COLORS]}
              </Button>
            ) : (
              item[key as keyof IProps]
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
