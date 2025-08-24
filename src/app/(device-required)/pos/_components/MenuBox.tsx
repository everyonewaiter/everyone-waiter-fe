import Checkbox from "@/components/common/Checkbox";
import cn from "@/lib/utils";
import MenuBoxItem from "./MenuBoxItem";

interface IProps extends TableOrder {
  index: number;
  onSelect?: (menuid: (TableOrderMenu & { orderId: string }) | null) => void;
  select?: string;
  checked?: boolean;
  onCheckedChange?: () => void;
  nonInteractive?: boolean;
}

export default function MenuBox({
  index,
  onSelect,
  select,
  checked,
  onCheckedChange,
  nonInteractive,
  ...props
}: IProps) {
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
        const isSelected = select === menu.orderMenuId;
        const isInteractive = !nonInteractive;
        const handleClick = () => {
          if (!isInteractive) return;
          if (isSelected) {
            onSelect?.(null);
          } else {
            onSelect?.({ ...menu, orderId: props.orderId });
          }
        };
        const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
          if (!isInteractive) return;
          if (e.key === "Enter" || e.key === " ") {
            if (isSelected) {
              onSelect?.(null);
            } else {
              onSelect?.({ ...menu, orderId: props.orderId });
            }
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
              onKeyDown: handleKeyDown,
            })}
          >
            <MenuBoxItem key={menu.orderMenuId} {...menu} />
          </div>
        );
      })}
    </div>
  );
}
