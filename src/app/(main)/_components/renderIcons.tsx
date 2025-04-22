import ICON_MAP from "@/components/icons";

function renderIcon(iconName: string, isActive: boolean, size: number = 32) {
  const IconComponent = ICON_MAP[iconName as keyof typeof ICON_MAP];
  return (
    <IconComponent
      className={`stroke-0 ${isActive ? "text-primary" : "text-gray-300"}`}
      width={size}
      height={size}
    />
  );
}

export default renderIcon;
