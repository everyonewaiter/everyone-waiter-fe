import { useRef, useEffect, useState } from "react";
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
  const [dimensions, setDimensions] = useState<{
    width: number;
    height: number;
  }>({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const sizeList = ["sm", "md", "lg"] as const;

  const getSize = (size: (typeof sizeList)[number]) => {
    if (size === "sm") return "flex md:hidden";
    if (size === "md") return "hidden md:flex lg:hidden";
    if (size === "lg") return "hidden lg:flex";
    return "hidden";
  };

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        setDimensions({ width: rect.width, height: rect.height });
      }
    };

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <>
      {sizeList.map((size) => (
        <div
          key={size}
          ref={containerRef}
          className={`relative ${getSize(size)} ${layoutClassName}`}
          style={{ borderRadius: radius[size] }}
        >
          <svg className="absolute inset-0 h-full w-full">
            <rect
              x={strokeWidth / 2}
              y={strokeWidth / 2}
              width={Math.max(0, dimensions.width - strokeWidth)}
              height={Math.max(0, dimensions.height - strokeWidth)}
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
