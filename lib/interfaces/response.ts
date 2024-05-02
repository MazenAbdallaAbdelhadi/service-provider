export interface ResponseObject<T> {
  status: string;
  message: string;
  data: T;
}

interface PaginationResult {
  currentPage: number;
  limit: number;
  numberOfPages: number;
  documentCount: number;
  next?: number;
  prev?: number;
}

export interface PaginatedData<T> {
  results: number;
  paginationResult: PaginationResult;
  docs: T[];
}
