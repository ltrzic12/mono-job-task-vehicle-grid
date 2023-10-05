import { observer } from "mobx-react";
import "./paginationButton.css";
import vehicleModelStore from "../../stores/VehicleModelStore";

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

  console.log(
    "data: ",
    data,
    "pagesize: ",
    pageSize,
    "num of pages: ",
    numOfPages,
    "pages: ",
    pages,
  );

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

  console.log(
    "start at: ",
    vehicleModelStore.startAt,
    "end at: ",
    vehicleModelStore.endAt,
    "page: ",
    vehicleModelStore.currentPage,
  );
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
            value={page + 1}
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
