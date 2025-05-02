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

interface Move {
  target?: number;
  hasMore: boolean;
}

interface IProps {
  className?: string;
  currentPage: number;
  setCurrentPage: (value: number) => void;
  size: string;
  move: Record<"fastforward" | "forward" | "backward" | "fastbackward", Move>;
}

export default function Paginations({
  className,
  currentPage,
  setCurrentPage,
  size,
  move,
}: IProps) {
  return (
    <Pagination className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationFastPrev
            className={size}
            hasPrevPage={move?.fastbackward.hasMore}
            onClick={() => setCurrentPage(move.fastbackward.target!)}
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationPrevious
            className={size}
            hasPrevPage={move?.backward.hasMore}
            onClick={() =>
              move.backward.hasMore ? setCurrentPage(currentPage - 1) : null
            }
          />
        </PaginationItem>
        <PaginationItem className="mx-3">
          <PaginationLink className={size}>{currentPage}</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext
            hasNextPage={move?.forward.hasMore}
            className={size}
            onClick={() =>
              move.forward.hasMore ? setCurrentPage(currentPage + 1) : null
            }
          />
        </PaginationItem>
        <PaginationItem>
          <PaginationFastNext
            hasNextPage={move?.fastforward.hasMore}
            className={size}
            onClick={() => setCurrentPage(move.fastbackward.target!)}
          />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
