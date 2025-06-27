import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Icon from "@/components/common/Icon";
import { ArrowDownUp } from "lucide-react";

interface IProps {
  onSetPopupAction: (value: string) => void;
}

export default function Popup({ onSetPopupAction }: IProps) {
  return (
    <aside className="absolute top-8 right-0 z-1000 flex w-[136px] flex-col gap-2 rounded-[16px] bg-white p-3 shadow-[0px_2px_10px_rgba(0,0,0,0.08)]">
      <ResponsiveButton
        type="button"
        responsiveButtons={{
          lg: {
            buttonSize: "custom",
            className:
              "p-3 flex items-center gap-2 bg-white hover:bg-gray-700 rounded-[8px] border-none text-[15px] font-regular text-gray-100",
          },
        }}
        onClick={() => onSetPopupAction("순서 변경")}
      >
        <ArrowDownUp size={20} strokeWidth={1} />
        <span>순서 변경</span>
      </ResponsiveButton>
      <ResponsiveButton
        type="button"
        responsiveButtons={{
          lg: {
            buttonSize: "custom",
            className:
              "p-3 flex items-center gap-2 bg-white hover:bg-gray-700 rounded-[8px] border-none text-[15px] font-regular text-gray-100",
          },
        }}
        onClick={() => onSetPopupAction("옵션 삭제")}
      >
        <Icon iconKey="trash" size={20} />
        <span>옵션 삭제</span>
      </ResponsiveButton>
    </aside>
  );
}
