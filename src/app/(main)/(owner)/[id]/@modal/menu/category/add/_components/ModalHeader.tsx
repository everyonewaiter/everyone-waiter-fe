import ResponsiveButton from "@/components/common/Button/ResponsiveButton";
import Icon from "@/components/common/Icon/Icon";
import { ArrowDownUp } from "lucide-react";

interface IProps {
  optionState: "move" | "delete" | null;
  setOptionState: (state: "move" | "delete" | null) => void;
}

export default function ModalHeader({ optionState, setOptionState }: IProps) {
  return (
    <>
      <ResponsiveButton
        color="grey"
        responsiveButtons={{
          lg: {
            buttonSize: "md",
            className: "!rounded-[24px] !px-4 !py-2",
          },
        }}
        commonClassName="hidden lg:flex"
        onClick={() => setOptionState("move")}
      >
        <ArrowDownUp
          size={18}
          strokeWidth={1.5}
          className="md:h-3 md:w-3 lg:h-[18px] lg:w-[18px]"
        />
        <span className="lg:text-base">순서 변경</span>
      </ResponsiveButton>
      {!optionState && (
        <div className="flex items-center gap-4 lg:hidden">
          <button
            type="button"
            className="flex items-center gap-1"
            onClick={() => setOptionState("move")}
          >
            <ArrowDownUp
              size={16}
              strokeWidth={1.5}
              className="text-gray-300"
            />
            <span className="text-sm text-gray-300">순서 변경</span>
          </button>
          <button
            type="button"
            className="flex items-center gap-1"
            onClick={() => setOptionState("delete")}
          >
            <Icon iconKey="trash" className="text-status-error" size={16} />
            <span className="text-status-error text-sm">삭제</span>
          </button>
        </div>
      )}
    </>
  );
}
