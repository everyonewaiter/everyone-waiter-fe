import { PropsWithChildren } from "react";

export default function TableRow({
  children,
  className,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={`center h-full w-full text-center ${className}`}>
      {children}
    </div>
  );
}
