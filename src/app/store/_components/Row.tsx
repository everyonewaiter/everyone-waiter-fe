import { Button, ButtonColors } from "@/components/common/Button";
import useOverlay from "@/hooks/use-overlay";
import cn from "@/lib/utils";
import { TABLE_HEADER } from "@/app/stores/page";
import { PropsWithChildren } from "react";
import StoreApplicationModal from "./modals/StoreApplicationModal";
import PendingAcceptModal from "./modals/PendingAcceptModal";

export const STATUS_COLORS = {
  APPLY: "접수",
  REJECT: "반려",
  APPROVE: "승인",
  REAPPLY: "재접수",
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

function MobileDataCell({
  name,
  children,
}: PropsWithChildren<{ name: string }>) {
  return (
    <div className="flex h-12 w-full">
      <div className="text-s text-gray-0 center w-[140px] bg-gray-700 font-medium">
        {name}
      </div>
      <div className="text-s text-gray-0 center w-[180px] border-b border-b-gray-600 px-6 text-center font-medium">
        {children}
      </div>
    </div>
  );
}

interface IProps extends StoreDetail {
  index: number;
}

export default function Row({ index, ...item }: IProps) {
  const { open, close } = useOverlay();

  const handleOpenModal = () => {
    if (item.status === "REJECT") {
      open(() => <StoreApplicationModal close={close} item={item} />);
    } else if (item.status === "APPLY") {
      open(() => <PendingAcceptModal close={close} />);
    }
  };

  const handleDate = () => {
    const [date, time] = item.createdAt.split(" ");
    return [date.slice(2), time.slice(0, 5)].join(" ");
  };

  return (
    <div
      className="w-[320px] cursor-pointer md:w-full"
      role="button"
      tabIndex={0}
      onClick={handleOpenModal}
      onKeyDown={(e) => {
        if (e.key === "Enter") {
          handleOpenModal();
        }
      }}
    >
      <div className="text-gray-0 md:text-s hidden h-10 w-full items-center justify-center border-b border-b-gray-600 md:flex lg:h-[64px] lg:text-base lg:font-medium">
        <DataCell className={`${TABLE_HEADER["No."]}`}>{index + 1}</DataCell>
        <DataCell className={`${TABLE_HEADER["신청일"]}`}>
          {handleDate()}
        </DataCell>
        <DataCell className={`${TABLE_HEADER["상호명"]}`}>{item.name}</DataCell>
        <DataCell className={`${TABLE_HEADER["상태"]}`}>
          <Button
            color={item.status.toLowerCase() as ButtonColors}
            className={cn(
              "lg:font-regular lg:h-[37px] lg:px-5 lg:py-2 lg:text-sm",
              "md:h-[26px]",
              "h-5 rounded-[6px] px-3 py-1 text-xs font-semibold text-white"
            )}
          >
            {STATUS_COLORS[item.status]}
          </Button>
        </DataCell>
        <DataCell className={`${TABLE_HEADER["사유"]}`}>
          {item.reason || "-"}
        </DataCell>
      </div>
      <div className="flex flex-col overflow-hidden rounded-[16px] border border-gray-600 md:hidden">
        <MobileDataCell name="No.">{index + 1}</MobileDataCell>
        <MobileDataCell name="신청일">{handleDate()}</MobileDataCell>
        <MobileDataCell name="상호명">{item.name}</MobileDataCell>
        <MobileDataCell name="상태">
          <Button
            color={item.status.toLowerCase() as ButtonColors}
            className={cn(
              "h-5 rounded-[6px] px-3 py-1 text-xs font-semibold text-white"
            )}
          >
            {STATUS_COLORS[item.status]}
          </Button>
        </MobileDataCell>
        <MobileDataCell name="사유">{item.reason || "-"}</MobileDataCell>
      </div>
    </div>
  );
}
