import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import { ScrollArea } from "@/components/common/ScrollArea";
import { useEffect } from "react";

interface IProps {
  close: () => void;
  data: StoreInfoDetail;
}

export default function OriginModal({ close, data }: IProps) {
  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previousTouchAction = document.body.style.touchAction;
    document.body.style.overflow = "hidden";
    document.body.style.touchAction = "none";
    return () => {
      document.body.style.overflow = previousOverflow;
      document.body.style.touchAction = previousTouchAction;
    };
  }, []);

  return (
    <div
      className="bg-opacity-100 fixed inset-0 z-[9999] flex items-center justify-center bg-black/50"
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
        {data?.setting?.countryOfOrigins ? (
          <div className="flex flex-col overflow-hidden rounded-tl-[16px] rounded-tr-[16px]">
            <div className="text-gray-0 text-s flex h-10 items-center bg-gray-700 font-medium md:h-12 md:text-[15px]">
              <div className="center flex-1">품목</div>
              <div className="center flex-1">원산지</div>
            </div>
            <ScrollArea className="h-[160px] md:h-[192px]">
              {data?.setting?.countryOfOrigins.map((item) => (
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
        ) : (
          <span>원산지 정보가 없습니다.</span>
        )}
        <ResponsiveButton
          color="grey"
          responsiveButtons={{
            lg: { buttonSize: "lg", className: "!h-10" },
            md: { buttonSize: "lg", className: "!h-10" },
            sm: { buttonSize: "sm" },
          }}
          onClick={close}
        >
          닫기
        </ResponsiveButton>
      </div>
    </div>
  );
}
