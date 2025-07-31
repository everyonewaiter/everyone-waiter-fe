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
    import(`@/assets/icons/${iconKey}.svg`)
      .then((mod) => setIconComponent(() => mod.default))
      .catch(() => setIconComponent(null));
  }, [iconKey]);

  if (!IconComponent) return null;
  return (
    <IconComponent
      width={size}
      height={size}
      className={cn(isActive ? "text-primary" : "text-gray-300", className)}
      {...props}
    />
  );
}
