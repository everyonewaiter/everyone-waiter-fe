"use client";

import { SVGProps, useEffect, useState } from "react";
import cn from "@/lib/utils";

interface Props extends React.HTMLAttributes<SVGSVGElement> {
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
  const [IconComponent, setIconComponent] = useState<React.FC<
    SVGProps<SVGSVGElement>
  > | null>(null);

  useEffect(() => {
    let mounted = true;
    import(`@/assets/icons/${iconKey}.svg`)
      .then((mod) => mounted && setIconComponent(() => mod.default))
      .catch(() => mounted && setIconComponent(null));

    return () => {
      mounted = false;
    };
  }, [iconKey]);

  if (!IconComponent) {
    return (
      <div
        style={{ width: size - 3 }}
        className="inline-block shrink-0 rounded bg-gray-700/30"
      />
    );
  }

  return (
    <IconComponent
      width={size}
      height={size}
      className={cn(
        "shrink-0",
        isActive ? "text-primary" : "text-gray-300",
        className
      )}
      {...props}
    />
  );
}
