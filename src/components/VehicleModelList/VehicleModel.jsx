import { useEffect } from "react";
import { observer } from "mobx-react";
import "./vehicleModel.css";
import vehicleStore from "../../stores/VehicleStore";
import VehicleModelModal from "./VehicleModelModal";
import PaginationButton from "../PaginationButton/PaginationButton";

const VehicleModelList = () => {
  useEffect(() => {
    vehicleStore.changePage("models");
    vehicleStore.fetchVehicleModels();
    vehicleStore.fetchVehicleMakes();
  }, []);

  const handleChangeDirection = (e) => {
    const sort = e.target.value;
    console.log(sort);

    if (sort === "true") {
      vehicleStore.changeSelectedDirection(true);
    } else {
      vehicleStore.changeSelectedDirection(false);
    }
    vehicleStore.fetchVehicleModels();
  };

  const handleChangeFilter = (e) => {
    const filter = e.target.value;
    console.log(filter);
    vehicleStore.changeSelectedSort(filter);
    vehicleStore.fetchVehicleModels();
  };

  const style = {
    color: "rgb(101 103 107)",
  };

  return (
    <div className='vehicle-model-list'>
      <div className='toolbar'>
        <div>
          <label htmlFor='filter'>
            <i className='fa-solid fa-filter' style={style}></i>
          </label>
          <select name='filter' onChange={handleChangeFilter}>
            <option value='name'>Name</option>
            <option value='created_at'>Time</option>
            <option value='makeId'>Make</option>
          </select>
        </div>
        <div>
          <label htmlFor='orderBy'>
            {vehicleStore.ascending === true ? (
              <i className='fa-solid fa-arrow-down-a-z' style={style}></i>
            ) : (
              <i className='fa-solid fa-arrow-down-z-a' style={style}></i>
            )}
          </label>
          <select name='orderBy' onChange={handleChangeDirection}>
            <option value='true'>Ascending</option>
            <option value='false'>Descending</option>
          </select>
        </div>
      </div>
      {vehicleStore.vehicleModels && (
        <ul className='model-list'>
          {vehicleStore.vehicleModels.map((vehicle) => (
            <li key={vehicle.id}>
              <VehicleModelModal vehicle={vehicle}></VehicleModelModal>
            </li>
          ))}
        </ul>
      )}

      <PaginationButton></PaginationButton>
    </div>
  );
};

export default observer(VehicleModelList);
