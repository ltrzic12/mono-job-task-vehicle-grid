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
  let data = limit;
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
    let newStartAt = page * pageSize;
    let newEndAt = newStartAt + pageSize - 1;
    let newCurrentPage = page + 1;
    setPage(newStartAt, newEndAt, newCurrentPage);
  };
  const currentPageStyle = (page) => {
    const buttonStyle = {
      backgroundColor: "white",
      color: "black",
    };
    if (page + 1 === currentPage) {
      buttonStyle.backgroundColor = "rgba(128, 128, 128, 0.293)";
    }
    return buttonStyle;
  };

  const pageButtonDisabled = (page) => {
    let isDisabled = false;
    if (page + 1 === currentPage) {
      isDisabled = true;
    }

    return isDisabled;
  };

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
            value={page + 1}
            style={currentPageStyle(page)}
            onClick={() => handleChangePage(page)}
            disabled={pageButtonDisabled(page)}>
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
