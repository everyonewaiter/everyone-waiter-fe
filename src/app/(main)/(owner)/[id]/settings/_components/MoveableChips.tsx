import Icon from "@/components/common/Icon";
import { PropsWithChildren } from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";

interface IProps {
  onDelete: () => void;
  id: string;
}

export default function MoveableChips({
  children,
  onDelete,
  id,
}: PropsWithChildren<IProps>) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      ref={setNodeRef}
      className="flex flex-row items-center gap-0.5"
      style={style}
    >
      <div className="text-gray-0 font-regular flex h-[30px] flex-row items-center justify-center gap-[6px] rounded-[20px] bg-gray-700 px-3 py-[6px] text-xs md:rounded-[12px] lg:rounded-[20px]">
        {children}
        <button
          type="button"
          className="center"
          onClick={onDelete}
          aria-label="옵션 삭제"
        >
          <Icon iconKey="close" className="text-gray-300" size={16} />
        </button>
      </div>
      <button
        type="button"
        className="center cursor-pointer"
        aria-label="옵션 순서 이동"
        {...attributes}
        {...listeners}
      >
        <Icon iconKey="move" className="text-gray-300" size={20} />
      </button>
    </div>
  );
}
