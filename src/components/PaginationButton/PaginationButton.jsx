import { observer } from "mobx-react";
import "./paginationButton.css";
import vehicleStore from "../../stores/VehicleStore";

const PaginationButton = ({ fetch }) => {
  let show = true;
  if (vehicleStore.page === "makes") {
    if (vehicleStore.vehicleMakes.length < vehicleStore.limit) {
      show = false;
    }
  }
  if (vehicleStore.vehicleModels.length < vehicleStore.limit) {
    show = false;
  }
  return (
    <div className='pagination'>
      {show && <button onClick={fetch}>See more</button>}
    </div>
  );
};

export default observer(PaginationButton);
