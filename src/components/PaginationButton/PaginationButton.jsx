import { observer } from "mobx-react";
import "./paginationButton.css";
import vehicleStore from "../../stores/VehicleStore";

const PaginationButton = () => {
  const next = async () => {
    console.log("Next");

    await vehicleStore.incrementPageIndex();
  };

  const isPrevDisabled = vehicleStore.startAt === 0;

  const prev = async () => {
    console.log("Prev");
    await vehicleStore.decrementPageIndex();
  };

  return (
    <div className='pagination'>
      <button onClick={prev}>PREV</button>
      <h2>{vehicleStore.pageIndex}</h2>
      <button onClick={next}>NEXT</button>
    </div>
  );
};

export default observer(PaginationButton);
