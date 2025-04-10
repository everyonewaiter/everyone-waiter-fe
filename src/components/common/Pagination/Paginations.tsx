"use client";

import { useState } from "react";
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

export default function Paginations({ totalPages }: { totalPages: number }) {
  const [currentPage, setCurrentPage] = useState(1);

  const handlePagination = (type: "prev" | "next") => {
    if (currentPage > 1 && type === "prev") {
      setCurrentPage((state) => state - 1);
    } else if (currentPage < totalPages && type === "next") {
      setCurrentPage((state) => state + 1);
    }
  };

  const handleFastPagination = (type: "prev" | "next") => {
    if (currentPage > 5 && type === "prev") {
      setCurrentPage((state) => state - 5);
    } else if (currentPage <= totalPages - 5 && type === "next") {
      setCurrentPage((state) => state + 5);
    }
  };

  return (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationFastPrev
            hasPrevPage={currentPage > 5}
            onClick={() => handleFastPagination("prev")}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            hasPrevPage={currentPage > 1}
            onClick={() => handlePagination("prev")}
          />
        </PaginationItem>
        <PaginationItem className="mx-3">
          <PaginationLink onClick={() => {}}>{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            hasNextPage={currentPage < totalPages}
            onClick={() => handlePagination("next")}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationFastNext
            hasNextPage={currentPage <= totalPages - 5}
            onClick={() => handleFastPagination("next")}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
