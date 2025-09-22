import Checkbox from "@/components/common/Checkbox";
import cn from "@/lib/utils";
import MenuBoxItem from "./MenuBoxItem";
import { useSelectItemStore } from "../_hooks/useSelectItemStore";

interface IProps extends TableOrder {
  index: number;
  checked?: boolean;
  onCheckedChange?: () => void;
  nonInteractive?: boolean;
}

export default function MenuBox({
  index,
  checked,
  onCheckedChange,
  nonInteractive,
  ...props
}: IProps) {
  const { hasSelectedMenu, addSelectedMenu, removeSelectedMenu } =
    useSelectItemStore();

  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {!nonInteractive && (
          <Checkbox
            className="h-6 w-6"
            checked={checked}
            onCheckedChange={onCheckedChange}
          />
        )}
        <strong className="text-2xl font-semibold">{index + 1}</strong>
      </div>
      {props.orderMenus.map((menu) => {
        const isInteractive = !nonInteractive;
        const isSelected = hasSelectedMenu(menu.orderMenuId);

        const handleClick = () => {
          if (!isInteractive) return;
          if (isSelected) {
            removeSelectedMenu(menu.orderMenuId);
          } else {
            addSelectedMenu({
              orderId: props.orderId,
              ...menu,
            });
          }
        };

        return (
          <div
            key={menu.orderMenuId}
            className={cn(
              "rounded-xl border p-4",
              isSelected ? "border-primary" : "border-gray-600",
              isInteractive ? "cursor-pointer" : "cursor-default"
            )}
            {...(isInteractive && {
              role: "button",
              tabIndex: 0,
              onClick: handleClick,
              // onKeyDown: handleKeyDown,
            })}
          >
            <MenuBoxItem key={menu.orderMenuId} {...menu} />
          </div>
        );
      })}
    </div>
  );
}
