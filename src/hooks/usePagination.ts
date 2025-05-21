import { useState } from "react";

interface UsePaginationProps {
  totalItems: number;
  initialPage?: number;
  initialPageSize?: number;
}

interface UsePaginationReturn {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  handlePageChange: (page: number) => void;
  handlePageSizeChange: (size: number) => void;
}

export const usePagination = ({
  totalItems,
  initialPage = 1,
  initialPageSize = 10,
}: UsePaginationProps): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentPageSize, setCurrentPageSize] = useState(initialPageSize);

  const totalPages = Math.ceil(totalItems / currentPageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setCurrentPageSize(size);
  };
  return {
    currentPage,
    pageSize: currentPageSize,
    totalPages,
    handlePageChange,
    handlePageSizeChange,
  };
};
