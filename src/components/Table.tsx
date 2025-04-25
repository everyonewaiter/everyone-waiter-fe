import Row from "@/app/store/_components/Row";
import cn from "@/lib/utils";
import { PropsWithChildren, ReactNode } from "react";

export default function Table({
  className,
  children,
}: PropsWithChildren<{ className?: string }>) {
  return (
    <div className={cn("!my-6 w-full md:my-3 lg:my-6", className)}>
      {children}
    </div>
  );
}

function THeadLayout({ children }: { children: ReactNode }) {
  return (
    <div className="hidden items-center justify-center bg-gray-600 md:flex md:h-10 md:rounded-[12px] lg:h-16 lg:rounded-[16px]">
      {children}
    </div>
  );
}

function THead({ value, className }: { value: string; className: string }) {
  return (
    <div
      className={cn(
        className,
        "text-gray-0 text-s text-center md:font-medium lg:text-base lg:font-bold"
      )}
    >
      {value}
    </div>
  );
}

function RowLayout({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 flex w-full flex-col items-center gap-4 md:mt-0 md:items-start md:gap-0">
      {children}
    </div>
  );
}

Table.THeadLayout = THeadLayout;
Table.THead = THead;
Table.RowLayout = RowLayout;
Table.Row = Row;
