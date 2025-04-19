import ICON_MAP from "@/components/icons";

function renderIcon(
  iconKey: keyof typeof ICON_MAP,
  isActive: boolean,
  size: number = 32
) {
  const IconComponent = ICON_MAP[iconKey];
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
