"use client";

import {
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  Pagination,
  PaginationFastNext,
  PaginationFastPrev,
} from "./Component";

interface IProps {
  totalPages: number;
  className?: string;
  onSetCurrentPage: (value: number) => void;
  currentPage: number;
  size: string;
}

export default function Paginations({
  totalPages,
  className,
  onSetCurrentPage,
  currentPage,
  size,
}: IProps) {
  const handlePagination = (type: "prev" | "next") => {
    if (currentPage > 1 && type === "prev") {
      onSetCurrentPage(currentPage - 1);
    } else if (currentPage < totalPages && type === "next") {
      onSetCurrentPage(currentPage + 1);
    }
  };

  const handleFastPagination = (type: "prev" | "next") => {
    if (currentPage > 5 && type === "prev") {
      onSetCurrentPage(currentPage - 5);
    } else if (currentPage <= totalPages - 5 && type === "next") {
      onSetCurrentPage(currentPage + 5);
    }
  };

  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationFastPrev
            className={size}
            hasPrevPage={currentPage > 5}
            onClick={() => handleFastPagination("prev")}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            className={size}
            hasPrevPage={currentPage > 1}
            onClick={() => handlePagination("prev")}
          />
        </PaginationItem>
        <PaginationItem className="mx-3">
          <PaginationLink className={size}>{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            hasNextPage={currentPage < totalPages}
            className={size}
            onClick={() => handlePagination("next")}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationFastNext
            hasNextPage={currentPage <= totalPages - 5}
            className={size}
            onClick={() => handleFastPagination("next")}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
