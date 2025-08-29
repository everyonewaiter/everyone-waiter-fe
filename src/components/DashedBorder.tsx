import cn from "@/lib/utils";

interface DottedBorderBoxProps {
  children?: React.ReactNode;
  layoutClassName?: string;
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  dash?: number;
  gap?: number;
  radius?: {
    sm?: number;
    md?: number;
    lg?: number;
  };
}

const generateDashedBorderSVG = (
  strokeColor = "#C1C1C1",
  strokeWidth = 3,
  dash = 8,
  gap = 12,
  borderRadius = 24
) => {
  const encodedColor = encodeURIComponent(strokeColor);
  return `url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='${borderRadius}' ry='${borderRadius}' stroke='${encodedColor}' stroke-width='${strokeWidth}' stroke-dasharray='${dash}%2c${gap}' stroke-dashoffset='${dash}' stroke-linecap='square'/%3e%3c/svg%3e")`;
};

export default function DashedBorder({
  children,
  className = "",
  layoutClassName = "",
  strokeColor = "#C1C1C1",
  strokeWidth = 3,
  dash = 8,
  gap = 12,
  radius = { sm: 12, md: 16, lg: 24 },
}: DottedBorderBoxProps) {
  const sizeList = ["sm", "md", "lg"] as const;

  const getSize = (size: (typeof sizeList)[number]) => {
    if (size === "sm") return "flex md:hidden";
    if (size === "md") return "hidden md:flex lg:hidden";
    if (size === "lg") return "hidden lg:flex";
    return "hidden";
  };

  return (
    <>
      {sizeList.map((size) => (
        <div
          key={size}
          className={`relative ${getSize(size)} ${layoutClassName}`}
          style={{
            backgroundImage: generateDashedBorderSVG(
              strokeColor,
              strokeWidth,
              dash,
              gap,
              radius[size]
            ),
            borderRadius: radius[size],
          }}
        >
          <div
            className={cn(
              "relative flex w-full flex-col items-center justify-center p-4 md:gap-1 lg:gap-2",
              className
            )}
          >
            {children}
          </div>
        </div>
      ))}
    </>
  );
}
