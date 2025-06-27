import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { ScrollArea } from "@/components/common/ScrollArea";

const dummy = [
  { item: "소", origin: "국내산" },
  { item: "돼지", origin: "국내산" },
  { item: "연어", origin: "노르웨이산" },
  { item: "배추", origin: "국내산" },
];

interface IProps {
  close: () => void;
}

export default function OriginModal({ close }: IProps) {
  return (
    <div
      className="bg-opacity-100 fixed inset-0 z-[9999] flex items-center justify-center"
      onClick={close}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Escape") close();
      }}
    >
      <div
        className="flex w-[330px] flex-col gap-4 rounded-[20px] bg-white p-5 md:w-[395px] md:gap-6"
        onClick={(e) => e.stopPropagation()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Escape") e.stopPropagation();
        }}
      >
        <h1 className="text-gray-0 text-base font-semibold md:text-lg">
          원산지
        </h1>
        <div className="flex flex-col overflow-hidden rounded-tl-[16px] rounded-tr-[16px]">
          <div className="text-gray-0 text-s flex h-10 items-center bg-gray-700 font-medium md:h-12 md:text-[15px]">
            <div className="center flex-1">품목</div>
            <div className="center flex-1">원산지</div>
          </div>
          <ScrollArea className="h-[160px] md:h-[192px]">
            {dummy.map((item) => (
              <div
                key={item.item}
                className="text-gray-0 text-s flex h-10 items-center border-b border-b-gray-600 font-medium md:h-12 md:text-[15px]"
              >
                <div className="center flex-1">{item.item}</div>
                <div className="center flex-1">{item.origin}</div>
              </div>
            ))}
          </ScrollArea>
        </div>
        <ResponsiveButton
          responsiveButtons={{
            lg: { buttonSize: "lg", className: "!h-10" },
            md: { buttonSize: "lg", className: "!h-10" },
            sm: { buttonSize: "sm" },
          }}
        >
          확인
        </ResponsiveButton>
      </div>
    </div>
  );
}
