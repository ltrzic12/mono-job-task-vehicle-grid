import { observer } from "mobx-react";
import "./paginationButton.css";

const PaginationButton = ({ prev, next, endAt, limit, startAt }) => {
  const nextPage = async () => {
    await next();
  };

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

  return (
    <div className='pagination'>
      <button onClick={prevPage} disabled={!enabledPrev}>
        PREV
      </button>

      <button onClick={nextPage} disabled={!enabledNext}>
        NEXT
      </button>
    </div>
  );
};

export default observer(PaginationButton);
