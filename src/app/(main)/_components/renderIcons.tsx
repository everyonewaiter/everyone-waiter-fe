import ICON_MAP from "@/components/icons";

function renderIcon({
  iconKey,
  isActive,
  size,
  ...props
}: {
  iconKey: string;
  isActive?: boolean;
  size?: number;
}) {
  const IconComponent = ICON_MAP[iconKey as keyof typeof ICON_MAP];
  if (!IconComponent) return null;

  return (
    <IconComponent
      className={`stroke-0 ${isActive ? "text-primary" : "text-gray-300"}`}
      width={size || 32}
      height={size || 32}
      {...props}
    />
  );
}

export default renderIcon;
