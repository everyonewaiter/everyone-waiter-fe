declare global {
  type ValueOf<T> = T[keyof T];

  interface ResWithPagination<T> {
    content: T;
    count: number;
    fastBackwardPage: number;
    fastForwardPage: number;
    isFirst: boolean;
    isLast: boolean;
    page: number;
    pageSkipSize: number;
    size: number;
  }

  interface ErrorResponse {
    message: string;
    code: string;
    timestamp: string;
  }
}

export {};
