import React from "react";

interface DottedBorderBoxProps {
  children?: React.ReactNode;
  layoutClassName?: string;
  className?: string;
  strokeColor?: string;
  strokeWidth?: number;
  dash?: number;
  gap?: number;
  radius?: number;
}

export default function DashedBorder({
  children,
  className = "",
  layoutClassName = "",
  strokeColor = "#C1C1C1",
  strokeWidth = 2,
  dash = 12,
  gap = 8,
  radius = 24,
}: DottedBorderBoxProps) {
  return (
    <div
      className={`relative ${layoutClassName}`}
      style={{ borderRadius: radius }}
    >
      <svg className="pointer-events-none absolute inset-0 h-full w-full">
        <rect
          x={strokeWidth / 2}
          y={strokeWidth / 2}
          width={`calc(100% - ${strokeWidth}px)`}
          height={`calc(100% - ${strokeWidth}px)`}
          rx={radius}
          ry={radius}
          fill="none"
          stroke={strokeColor}
          strokeWidth={strokeWidth}
          strokeDasharray={`${dash} ${gap}`}
          strokeLinecap="square"
        />
      </svg>
      <div className={`h-full w-full ${className}`}>{children}</div>
    </div>
  );
}
