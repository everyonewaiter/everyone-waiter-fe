import Icon from "@/components/common/Icon/Icon";
import { ArrowDownUp } from "lucide-react";
import { OptionState } from "../page";

interface IProps {
  setOptionState: (state: OptionState | null) => void;
}

export default function ModalHeader({ setOptionState }: IProps) {
  return (
    <div className="flex items-center gap-4">
      <button
        type="button"
        className="flex items-center gap-1 lg:gap-2"
        onClick={() => setOptionState("move" as OptionState)}
      >
        <ArrowDownUp
          size={16}
          strokeWidth={1.5}
          className="text-gray-300 md:h-3 md:w-3 lg:mt-[1px] lg:h-5 lg:w-5"
        />
        <span className="text-sm text-gray-300 lg:text-lg">순서 변경</span>
      </button>
      <button
        type="button"
        className="flex items-center gap-1 lg:gap-2"
        onClick={() => setOptionState("delete" as OptionState)}
      >
        <Icon
          iconKey="trash"
          className="text-status-error md:h-3 md:w-3 lg:mt-[1px] lg:h-5 lg:w-5"
          size={16}
        />
        <span className="text-status-error text-sm lg:text-lg">삭제</span>
      </button>
    </div>
  );
}
