import { observer } from "mobx-react";
import "./paginationButton.css";
import vehicleStore from "../../stores/VehicleStore";

const PaginationButton = () => {
  const next = () => {
    console.log("Next");
    vehicleStore.incrementPageIndex();
    vehicleStore.fetchVehicleModels();
  };
  const prev = () => {
    console.log("Prev");
    vehicleStore.decrementPageIndex();
    vehicleStore.fetchVehicleModels();
  };
  return (
    <div className='pagination'>
      <button onClick={prev}>PREV</button>
      <button onClick={next}>NEXT</button>
    </div>
  );
};

export default observer(PaginationButton);
