import { useState } from "react";


function usePagination(data, listView) {

  const [currentPage, setCurrentPage] = useState(1);
  const maxPage = Math.ceil(data?.length / listView);

  function currentData() {
    const start = (currentPage - 1) * listView;
    const end = start + listView;
    return data?.slice(start, end);
  }

  function next() {
    setCurrentPage(currentPage => Math.min(currentPage + 1, maxPage));
  }

  function prev() {
    setCurrentPage(currentPage => Math.max(currentPage - 1, 1));
  }

  function jump(page) {
    const pageNumber = Math.max(1, page);
    setCurrentPage(currentPage => Math.min(pageNumber, maxPage));
  }

  return { next, prev, jump, currentData, currentPage, maxPage }
}

export default usePagination;