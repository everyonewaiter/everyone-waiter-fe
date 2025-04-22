function renderIcon(
  IconComponent: React.ComponentType<React.SVGProps<SVGSVGElement>>,
  isActive: boolean,
  size: number = 32
) {
  return (
    <IconComponent
      className={`stroke-0 ${isActive ? "text-primary" : "text-gray-300"}`}
      width={size}
      height={size}
    />
  );
}

export default renderIcon;
