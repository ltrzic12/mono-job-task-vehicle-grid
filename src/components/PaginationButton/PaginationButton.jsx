import { observer } from "mobx-react";
import "./paginationButton.css";
import vehicleMakeStore from "../../stores/VehicleMakeStore";

const PaginationButton = ({ prev, next, endAt, limit, startAt }) => {
  const nextPage = async () => {
    console.log("next", "startAt: ", vehicleMakeStore.startAt);
    await next();
  };

  const prevPage = async () => {
    console.log("Prev");
    await prev();
  };

  let enabledNext;
  if (endAt <= limit) {
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
