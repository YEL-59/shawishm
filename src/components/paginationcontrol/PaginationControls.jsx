// components/Pagination.js
import React from "react";
import { usePagination } from "../../contexts/PaginationContext";


const Pagination = ({ totalItems }) => {
  const { currentPage, setCurrentPage, itemsPerPage, setItemsPerPage } = usePagination();

  const totalPages = Math.ceil(totalItems / itemsPerPage);

  const handlePageChange = (page) => {
    if (page > 0 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 mt-4"> 
      <button
        onClick={() => handlePageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50"
      >
        Prev
      </button>
      <span>
        Page {currentPage} of {totalPages}
      </span>
      <button
        onClick={() => handlePageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className="px-4 py-2 bg-gray-300 rounded disabled:opacity-50" 
      >
        Next
      </button>
      <select
        value={itemsPerPage}
        onChange={(e) => setItemsPerPage(Number(e.target.value))}
        className="ml-4 px-2 py-1 border rounded"
      >
        {[5, 10, 20, 50].map((count) => (
          <option key={count} value={count}>
            {count} / page
          </option>
        ))}
      </select>
    </div>
  );
};

export default Pagination;
