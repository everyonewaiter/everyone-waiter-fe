import { ReactNode } from "react";

interface TypeChildren {
  children: ReactNode;
}

interface IResWithPagination<T> {
  content: T;
  count: number;
  fastBackwardPage: number;
  fastForwardPage: number;
  hasNext: boolean;
  hasPrevious: boolean;
  isFirst: boolean;
  isLast: boolean;
  page: number;
  pageSkipSize: number;
  size: number;
}
