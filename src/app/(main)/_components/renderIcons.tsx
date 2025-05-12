import ICON_MAP from "@/components/icons";
import cn from "@/lib/utils";

function renderIcon({
  iconKey,
  isActive,
  size,
  className,
  ...props
}: {
  iconKey: string;
  isActive?: boolean;
  size?: number;
  className?: string;
}) {
  const IconComponent = ICON_MAP[iconKey as keyof typeof ICON_MAP];
  if (!IconComponent) return null;

  return (
    <IconComponent
      className={cn(
        `stroke-0 ${isActive ? "text-primary" : "text-gray-300"}`,
        className
      )}
      width={size || 32}
      height={size || 32}
      {...props}
    />
  );
}

export default renderIcon;
