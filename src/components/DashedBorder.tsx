import cn from "@/lib/utils";
import React from "react";

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

export default function DashedBorder({
  children,
  className = "",
  layoutClassName = "",
  strokeColor = "#C1C1C1",
  strokeWidth = 2,
  dash = 12,
  gap = 8,
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
          style={{ borderRadius: radius[size] }}
        >
          <svg className="absolute inset-0 h-full w-full">
            <rect
              x={strokeWidth / 2}
              y={strokeWidth / 2}
              width={`calc(100% - ${strokeWidth}px)`}
              height={`calc(100% - ${strokeWidth}px)`}
              rx={radius[size]}
              ry={radius[size]}
              fill="none"
              stroke={strokeColor}
              strokeWidth={strokeWidth}
              strokeDasharray={`${dash} ${gap}`}
              strokeLinecap="square"
            />
          </svg>
          <div
            className={cn(
              "relative flex w-full flex-col items-center justify-center md:gap-1 lg:gap-2",
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
