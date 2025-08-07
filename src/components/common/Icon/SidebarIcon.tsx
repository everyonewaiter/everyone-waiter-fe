import { SVGProps } from "react";
import cn from "@/lib/utils";
import PeopleIcon from "@/assets/icons/people.svg";
import CheckSquareIcon from "@/assets/icons/check-square.svg";
import HomeIcon from "@/assets/icons/home.svg";
import ShopIcon from "@/assets/icons/shop.svg";
import CategoryIcon from "@/assets/icons/category.svg";
import MobileIcon from "@/assets/icons/mobile.svg";
import SettingsIcon from "@/assets/icons/settings.svg";

const ICON_MAP: Record<string, React.FC<SVGProps<SVGSVGElement>>> = {
  people: PeopleIcon,
  "check-square": CheckSquareIcon,
  home: HomeIcon,
  shop: ShopIcon,
  category: CategoryIcon,
  mobile: MobileIcon,
  settings: SettingsIcon,
};

interface Props extends React.HTMLAttributes<SVGSVGElement> {
  iconKey: string;
  isActive?: boolean;
  size?: number;
  className?: string;
}

export default function SidebarIcon({
  iconKey,
  isActive = false,
  size = 32,
  className = "",
  ...props
}: Props) {
  const IconComponent = ICON_MAP[iconKey];
  if (!IconComponent) return null;
  return (
    <IconComponent
      width={size}
      height={size}
      className={cn(
        "shrink-0",
        isActive ? "text-primary" : "text-gray-300",
        className
      )}
      {...props}
    />
  );
}
