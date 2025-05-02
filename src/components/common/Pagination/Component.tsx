import * as React from "react";
import cn from "@/lib/utils";

function Pagination({ className, ...props }: React.ComponentProps<"nav">) {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      className={cn("mx-auto flex w-full justify-center", className)}
      {...props}
    />
  );
}
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

function PaginationLink({
  className,
  isActive,
  onClick,
  ...props
}: PaginationLinkProps) {
  return (
    <button
      type="button"
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "text-s h-6 w-6 rounded-[4px] bg-gray-100 text-white md:mt-1 md:h-5 md:w-5 md:text-xs md:font-semibold lg:mb-1 lg:h-6 lg:w-6 lg:text-sm lg:font-bold",
        className
      )}
      onClick={onClick}
    >
      {props.children || "Link"}
    </button>
  );
}
PaginationLink.displayName = "PaginationLink";

function PaginationPrevious({
  className,
  hasPrevPage,
  onClick,
}: {
  className?: string;
  hasPrevPage: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label="이전 페이지"
      className={cn(
        "flex h-6 w-6 items-center justify-center",
        className,
        hasPrevPage ? "cursor-pointer" : "cursor-default"
      )}
      onClick={() => (hasPrevPage ? onClick() : null)}
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
}
PaginationPrevious.displayName = "PaginationPrevious";

function PaginationNext({
  className,
  hasNextPage,
  onClick,
}: {
  className?: string;
  hasNextPage: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label="다음 페이지로 이동"
      className={cn(
        "flex h-6 w-6 cursor-pointer items-center justify-center",
        className,
        hasNextPage ? "cursor-pointer" : "cursor-default"
      )}
      onClick={() => (hasNextPage ? onClick() : null)}
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
}
PaginationNext.displayName = "PaginationNext";

function PaginationFastPrev({
  className,
  hasPrevPage,
  onClick,
}: {
  className?: string;
  hasPrevPage: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={
        hasPrevPage
          ? "타겟 페이지 또는 다섯 페이지 전으로 이동"
          : "페이지 이동 없음"
      }
      className={cn(
        "flex h-6 w-6 items-center justify-center",
        className,
        hasPrevPage ? "cursor-pointer" : "cursor-default"
      )}
      onClick={() => (hasPrevPage ? onClick() : null)}
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
}
PaginationFastPrev.displayName = "PaginationFastPrev";

function PaginationFastNext({
  className,
  hasNextPage,
  onClick,
}: {
  className?: string;
  hasNextPage: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={
        hasNextPage
          ? "타겟 페이지 또는 다섯 페이지 후로 이동"
          : "페이지 이동 없음"
      }
      className={cn(
        "flex h-6 w-6 items-center justify-center",
        className,
        hasNextPage ? "cursor-pointer" : "cursor-default"
      )}
      onClick={() => (hasNextPage ? onClick() : null)}
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
}
PaginationFastNext.displayName = "PaginationFastNext";

export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationFastPrev,
  PaginationFastNext,
};
