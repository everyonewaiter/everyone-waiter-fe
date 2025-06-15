import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import MenuCard from "./MenuCard";

interface IProps {
  item: Menu;
  onClick: () => void;
}

export default function SortableItem({ item, onClick }: IProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: item.menuId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <MenuCard
        {...item}
        onToggle={() => null}
        isSelected={false}
        hideSelect
        onClick={onClick}
      />
    </div>
  );
}
