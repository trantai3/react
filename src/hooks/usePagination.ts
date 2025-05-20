import { useState } from "react";

interface UsePaginationProps {
  totalItems: number;
  initialPage?: number;
  pageSize?: number;
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
  pageSize = 10,
}: UsePaginationProps): UsePaginationReturn => {
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [currentPageSize, setCurrentPageSize] = useState(pageSize);

  const totalPages = Math.ceil(totalItems / currentPageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePageSizeChange = (size: number) => {
    setCurrentPageSize(size);
    setCurrentPage(1);
  };

  return {
    currentPage,
    pageSize: currentPageSize,
    totalPages,
    handlePageChange,
    handlePageSizeChange,
  };
};
