import { observer } from "mobx-react";
import "./paginationButton.css";

const PaginationButton = ({
  prev,
  next,
  endAt,
  limit,
  startAt,
  currentPage,
  totalNumberOfData,
  pageSize,
  setPage,
}) => {
  const nextPage = async () => {
    await next();
  };

  let pages = [];
  let data = totalNumberOfData;
  let numOfPages = Math.ceil(data / pageSize);

  for (let i = 0; i < numOfPages; i++) {
    pages.push(i);
  }

  const prevPage = async () => {
    await prev();
  };

  let enabledNext;

  if (endAt + 1 < limit) {
    enabledNext = true;
  }

  let enabledPrev;

  if (startAt > 0) {
    enabledPrev = true;
  }

  const handleChangePage = (page) => {
    let newEndAt = Math.ceil(endAt / currentPage) * (page + 1);
    let newStartAt = newEndAt - endAt / currentPage;
    let newCurrentPage = page + 1;
    setPage(newStartAt, newEndAt, newCurrentPage);
  };

  // const currentPageStyle = (page) => {};

  return (
    <div className='pagination'>
      <button
        onClick={prevPage}
        disabled={!enabledPrev}
        className='button-prev'></button>

      {pages.map((page) => {
        return (
          <button
            className='page-button'
            key={page}
            onClick={() => handleChangePage(page)}>
            {page + 1}
          </button>
        );
      })}

      <button
        onClick={nextPage}
        disabled={!enabledNext}
        className='button-next'></button>
    </div>
  );
};

export default observer(PaginationButton);
