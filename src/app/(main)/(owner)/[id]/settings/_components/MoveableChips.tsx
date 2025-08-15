import { useSortable } from "@/components/dnd/index";
import { PropsWithChildren } from "react";
import Icon from "@/components/common/Icon/Icon";

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

  const translate = transform
    ? `translate3d(${Math.round(transform.x)}px, ${Math.round(
        transform.y
      )}px, 0)`
    : undefined;

  const style = {
    transform: translate,
    transition,
    willChange: "transform",
    WebkitFontSmoothing: "antialiased",
    MozOsxFontSmoothing: "grayscale",
    backfaceVisibility: "hidden",
  } as React.CSSProperties;

  return (
    <div
      ref={setNodeRef}
      className="m-1 flex w-fit flex-none flex-row items-center gap-2 select-none"
      style={style}
    >
      <div className="text-gray-0 font-regular flex h-[30px] flex-row items-center justify-center gap-[6px] rounded-[20px] bg-gray-700 px-3 py-[6px] text-xs whitespace-nowrap md:rounded-[12px] lg:rounded-[20px]">
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
