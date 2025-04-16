/* eslint-disable jsx-a11y/control-has-associated-label */
/* eslint-disable react/button-has-type */
/* eslint-disable react/function-component-definition */
import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import cn from "@/lib/utils";

const Pagination = ({ className, ...props }: React.ComponentProps<"nav">) => (
  <nav
    role="navigation"
    aria-label="pagination"
    className={cn("mx-auto flex w-full justify-center", className)}
    {...props}
  />
);
Pagination.displayName = "Pagination";

const PaginationContent = React.forwardRef<
  HTMLUListElement,
  React.ComponentProps<"ul">
>(({ className, ...props }, ref) => (
  <ul
    ref={ref}
    className={cn("flex flex-row items-center gap-1", className)}
    {...props}
  />
));
PaginationContent.displayName = "PaginationContent";

const PaginationItem = React.forwardRef<
  HTMLLIElement,
  React.ComponentProps<"li">
>(({ className, ...props }, ref) => (
  <li ref={ref} className={cn("cursor-pointer", className)} {...props} />
));
PaginationItem.displayName = "PaginationItem";

type PaginationLinkProps = {
  isActive?: boolean;
} & React.ComponentProps<"button">;

const PaginationLink = ({
  className,
  isActive,
  onClick,
  ...props
}: PaginationLinkProps) => (
  <button
    aria-current={isActive ? "page" : undefined}
    className={cn(
      "text-s h-6 w-6 rounded-[4px] bg-gray-100 text-white md:mb-1 md:h-5 md:w-5 md:text-xs md:font-semibold lg:h-6 lg:w-6 lg:text-sm lg:font-bold",
      className
    )}
    onClick={onClick}
  >
    {props.children || "Link"}
  </button>
);
PaginationLink.displayName = "PaginationLink";

const PaginationPrevious = ({
  className,
  hasPrevPage,
  onClick,
}: React.ComponentProps<typeof PaginationLink> & { hasPrevPage: boolean }) => (
  <button
    className={cn(
      "flex h-6 w-6 items-center justify-center",
      className,
      hasPrevPage ? "cursor-pointer" : "cursor-default"
    )}
    onClick={onClick}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={hasPrevPage ? "fill-gray-100" : "fill-gray-400"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M15.4102 7.41L10.8302 12L15.4102 16.59L14.0002 18L8.00016 12L14.0002 6L15.4102 7.41Z" />
    </svg>
  </button>
);
PaginationPrevious.displayName = "PaginationPrevious";

const PaginationNext = ({
  className,
  hasNextPage,
  onClick,
}: React.ComponentProps<typeof PaginationLink> & { hasNextPage: boolean }) => (
  <button
    className={cn(
      "flex h-6 w-6 cursor-pointer items-center justify-center",
      className,
      hasNextPage ? "cursor-pointer" : "cursor-default"
    )}
    onClick={onClick}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={hasNextPage ? "fill-gray-100" : "fill-gray-400"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M8 7.41L12.58 12L8 16.59L9.41 18L15.41 12L9.41 6L8 7.41Z" />
    </svg>
  </button>
);
PaginationNext.displayName = "PaginationNext";

const PaginationFastPrev = ({
  className,
  hasPrevPage,
  onClick,
}: React.ComponentProps<typeof PaginationLink> & { hasPrevPage: boolean }) => (
  <button
    className={cn(
      "flex h-6 w-6 items-center justify-center",
      className,
      hasPrevPage ? "cursor-pointer" : "cursor-default"
    )}
    onClick={onClick}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={hasPrevPage ? "fill-gray-100" : "fill-gray-500"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M12.4102 7.41L7.83016 12L12.4102 16.59L11.0002 18L5.00016 12L11.0002 6L12.4102 7.41Z" />
      <path d="M19.6602 7.41L15.0802 12L19.6602 16.59L18.2502 18L12.2502 12L18.2502 6L19.6602 7.41Z" />
    </svg>
  </button>
);
PaginationFastPrev.displayName = "PaginationFastPrev";

const PaginationFastNext = ({
  className,
  hasNextPage,
  onClick,
}: React.ComponentProps<typeof PaginationLink> & { hasNextPage: boolean }) => (
  <button
    className={cn(
      "flex h-6 w-6 items-center justify-center",
      className,
      hasNextPage ? "cursor-pointer" : "cursor-default"
    )}
    onClick={onClick}
  >
    <svg
      width="24"
      height="24"
      viewBox="0 0 24 24"
      className={hasNextPage ? "fill-gray-100" : "fill-gray-400"}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M5 7.41L9.58 12L5 16.59L6.41 18L12.41 12L6.41 6L5 7.41Z" />
      <path d="M12.1602 7.41L16.7402 12L12.1602 16.59L13.5702 18L19.5702 12L13.5702 6L12.1602 7.41Z" />
    </svg>
  </button>
);
PaginationFastNext.displayName = "PaginationFastNext";

const PaginationEllipsis = ({
  className,
  ...props
}: React.ComponentProps<"span">) => (
  <span
    aria-hidden
    className={cn("flex h-9 w-9 items-center justify-center", className)}
    {...props}
  >
    <MoreHorizontal className="h-4 w-4" />
    <span className="sr-only">More pages</span>
  </span>
);
PaginationEllipsis.displayName = "PaginationEllipsis";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
  PaginationFastPrev,
  PaginationFastNext,
};
