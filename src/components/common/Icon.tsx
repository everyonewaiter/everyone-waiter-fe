"use client";

import { useEffect, useState } from "react";
import cn from "@/lib/utils";

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  iconKey: string;
  isActive?: boolean;
  size?: number;
  className?: string;
}

export default function Icon({
  iconKey,
  isActive = false,
  size = 32,
  className = "",
  ...props
}: Props) {
  const [svg, setSvg] = useState<string | null>(null);
  const iconSrc = `/icons/${iconKey}.svg`;

  useEffect(() => {
    fetch(iconSrc)
      .then((res) => res.text())
      .then(setSvg);
  }, [iconKey, iconSrc]);

  if (!svg) return null;

  return (
    <div
      className={cn(
        `inline-block text-gray-300 ${isActive ? "text-primary" : "text-gray-300"}`,
        className
      )}
      style={{ width: size, height: size, stroke: "none" }}
      dangerouslySetInnerHTML={{ __html: svg }}
      {...props}
    />
  );
}
