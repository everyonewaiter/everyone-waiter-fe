import cn from "@/lib/utils";
import Icon from "@/components/common/Icon/Icon";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import OptionBox from "./OptionBox";

interface IProps {
  type: "requiredOptions" | "optionalOptions";
  index: number;
  isEditing: boolean;
  popupAction: string;
  id?: string;
  onDelete: () => void;
}

export default function OptionItem({
  type,
  index,
  isEditing,
  popupAction,
  id,
  onDelete,
}: IProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: id ?? `${type}-${index}` });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  } as React.CSSProperties;

  const isSortMode = popupAction === "순서 변경";

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={cn(
        "flex gap-3",
        index > 0 ? "mt-3 lg:mt-4" : "",
        popupAction ? "items-center" : "item-start"
      )}
      {...(isSortMode ? { ...attributes, ...listeners } : {})}
    >
      <OptionBox
        type={type}
        index={index}
        isEditing={isEditing}
        disabled={!!popupAction}
      />
      {isEditing && (
        <button
          type="button"
          className="center h-8 w-8 rounded-lg border border-gray-600"
          onClick={() => {
            if (!isSortMode) onDelete();
          }}
        >
          <Icon
            iconKey={isSortMode ? "move" : "trash"}
            size={18}
            className={isSortMode ? "text-gray-300" : "text-gray-0"}
          />
        </button>
      )}
    </div>
  );
}
