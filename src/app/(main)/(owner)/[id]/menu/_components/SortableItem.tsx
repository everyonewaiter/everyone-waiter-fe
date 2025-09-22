import { useSortable, CSS } from "@/components/dnd/index";
import MenuCard from "./MenuCard";
import { TypeMenuList } from "../_schema/menu.schema";

type SortableMenu = Menu | TypeMenuList["menus"][number];

interface IProps {
  item: SortableMenu;
  onClick: () => void;
}

export default function SortableItem({ item, onClick }: IProps) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: (item as any).menuId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const normalized = {
    ...(item as any),
    price:
      typeof (item as any).price === "string"
        ? Number(String((item as any).price).replace(/,/g, "") || 0)
        : (item as any).price,
    categoryId: (item as any).categoryId ?? (item as any).category,
  } as unknown as Menu;

  return (
    <div ref={setNodeRef} style={style} {...attributes} {...listeners}>
      <MenuCard
        {...(normalized as Menu)}
        isSelected={false}
        hideSelect
        onClick={onClick}
        className="animate-wiggle"
      />
    </div>
  );
}
