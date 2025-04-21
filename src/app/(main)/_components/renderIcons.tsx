import ICON_MAP from "@/shared/ui/icons";

function renderIcon(iconKey: string, isActive: boolean, size: number = 32) {
  const IconComponent = ICON_MAP[iconKey as keyof typeof ICON_MAP];
  if (!IconComponent) return null;

  return (
    <IconComponent
      className={`stroke-0 ${isActive ? "text-primary" : "text-gray-300"}`}
      width={size}
      height={size}
    />
  );
}

export default renderIcon;
