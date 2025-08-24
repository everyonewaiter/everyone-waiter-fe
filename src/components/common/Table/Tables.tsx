/* eslint-disable no-lone-blocks */
import * as React from "react";
import cn from "@/lib/utils";

const Table = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, children, ...props }, ref) => (
  <div className="z-100 w-full overflow-auto">
    <table
      ref={ref}
      className={cn("z-100 my-6 w-full md:my-3 lg:my-6", className)}
      {...props}
    >
      {children}
    </table>
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "hidden cursor-default items-center justify-center !bg-gray-700 md:flex md:h-10 md:rounded-xl lg:h-16 lg:rounded-2xl",
      className
    )}
    {...props}
  >
    {children}
  </thead>
));
TableHeader.displayName = "TableHeader";

const TableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & { className?: string }
>(({ className, children, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "text-s font-regular !text-gray-0 hidden h-full w-full cursor-default items-center justify-center md:flex lg:text-base lg:font-semibold",
      className
    )}
    {...props}
  >
    {children}
  </th>
));
TableHead.displayName = "TableHead";

const TableBody = React.forwardRef<
  HTMLTableSectionElement,
  React.HTMLAttributes<HTMLTableSectionElement>
>(({ className, children, ...props }, ref) => (
  <tbody ref={ref} className={cn(className)} {...props}>
    {children}
  </tbody>
));
TableBody.displayName = "TableBody";

const TableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement> & {
    isHead?: boolean;
  }
>(({ className, isHead, children, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "hidden w-full cursor-pointer items-center justify-center md:flex md:h-10 md:flex-row lg:h-16",
      isHead ? "" : "border-b border-b-gray-600",
      className
    )}
    {...props}
  >
    {children}
  </tr>
));
TableRow.displayName = "TableRow";

const TableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & { className?: string }
>(({ className, children, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "text-gray-0 font-regular flex justify-center py-4 text-center text-xs lg:text-base",
      className
    )}
    {...props}
  >
    {children}
  </td>
));
TableCell.displayName = "TableCell";

const MobileTable = React.forwardRef<
  HTMLTableElement,
  React.HTMLAttributes<HTMLTableElement>
>(({ className, ...props }, ref) => (
  <div className="block w-full overflow-auto md:hidden">
    <table
      ref={ref}
      className={cn(
        "block overflow-hidden rounded-2xl border border-gray-600",
        className
      )}
      {...props}
    />
  </div>
));
MobileTable.displayName = "MobileTable";

const MobileTableRow = React.forwardRef<
  HTMLTableRowElement,
  React.HTMLAttributes<HTMLTableRowElement>
>(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn("flex h-12 w-full md:table-row", className)}
    {...props}
  />
));
MobileTableRow.displayName = "MobileTableRow";

const MobileTableHead = React.forwardRef<
  HTMLTableCellElement,
  React.ThHTMLAttributes<HTMLTableCellElement> & { className?: string }
>(({ className, children, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      "!text-s text-gray-0 flex flex-[0.58] items-center justify-center bg-gray-700 font-medium",
      className
    )}
    {...props}
  >
    {children}
  </th>
));
MobileTableHead.displayName = "MobileTableHead";

const MobileTableCell = React.forwardRef<
  HTMLTableCellElement,
  React.TdHTMLAttributes<HTMLTableCellElement> & {
    className?: string;
    hideBorder?: boolean;
  }
>(({ children, className, hideBorder, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "!text-s text-gray-0 font-regular flex flex-[0.56] items-center justify-center px-6 text-center",
      hideBorder ? "" : "border-b border-b-gray-600",
      className
    )}
    {...props}
  >
    {children}
  </td>
));
MobileTableCell.displayName = "MobileTableCell";

export {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  MobileTable,
  MobileTableRow,
  MobileTableHead,
  MobileTableCell,
};
