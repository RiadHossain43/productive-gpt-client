import { useState } from "react";
const defaultPaginationState = {
  currentPage: 1,
  hasNextPage: false,
  hasPrevPage: false,
  nextPage: null,
  prevPage: null,
  size: 10,
  totalPages: 0,
  totalResults: 0,
};
const usePaginationState = () => {
  const [pagination, setPagination] = useState(defaultPaginationState);
  function updatePaginaion(pagination = defaultPaginationState) {
    setPagination(pagination);
  }
  return {
    pagination,
    updatePaginaion,
  };
};

export default usePaginationState;
