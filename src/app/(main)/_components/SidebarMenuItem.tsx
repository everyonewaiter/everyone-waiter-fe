import SidebarIcon from "@/components/common/Icon/SidebarIcon";
import { MenuItem } from "@/constants/sidebarMenus";
import cn from "@/lib/utils";

interface IProps extends MenuItem {
  active: boolean;
  onClick: () => void;
  onPrefetchURL: () => void;
  className?: string;
}

export default function SidebarMenuItem({
  active,
  onClick,
  onPrefetchURL,
  className,
  ...props
}: IProps) {
  return (
    <li>
      <button
        type="button"
        className={cn(
          "flex items-center px-2 py-[9px] text-[13px] transition-colors lg:text-[16px]",
          active ? "text-primary" : "text-gray-300",
          className
        )}
        onClick={onClick}
        onMouseEnter={onPrefetchURL}
      >
        <div
          className={`z-1 size-2 rounded-full ${
            active ? "bg-primary" : "bg-gray-600"
          }`}
        />
        <SidebarIcon
          iconKey={props.icon as string}
          className={`size-6 shrink-0 ${active ? "text-primary" : "text-gray-300"}`}
          style={{ minWidth: "24px", minHeight: "24px" }}
        />
        <span className="font-medium">{props.label}</span>
      </button>
    </li>
  );
}
