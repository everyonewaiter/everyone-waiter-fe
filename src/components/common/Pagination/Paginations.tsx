"use client";

import {
  Pagination,
  PaginationContent,
  PaginationFastNext,
  PaginationFastPrev,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./Component";

interface IProps {
  className?: string;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  size: string;
  hasNext?: boolean;
  hasPrevious?: boolean;
  fastForwardTarget?: number;
  fastBackwardTarget?: number;
}

export default function Paginations({
  className,
  currentPage,
  setCurrentPage,
  size,
  hasNext,
  hasPrevious,
  fastForwardTarget,
  fastBackwardTarget,
}: IProps) {
  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationFastPrev
            className={size}
            hasPrevPage={hasPrevious!}
            onClick={() => setCurrentPage(fastBackwardTarget!)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            className={size}
            hasPrevPage={hasPrevious!}
            onClick={() =>
              hasPrevious ? setCurrentPage(currentPage - 1) : null
            }
          />
        </PaginationItem>
        <PaginationItem className="mx-3">
          <PaginationLink className={size}>{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            hasNextPage={hasNext!}
            className={size}
            onClick={() => (hasNext ? setCurrentPage(currentPage + 1) : null)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationFastNext
            hasNextPage={hasNext!}
            className={size}
            onClick={() => setCurrentPage(fastForwardTarget!)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
