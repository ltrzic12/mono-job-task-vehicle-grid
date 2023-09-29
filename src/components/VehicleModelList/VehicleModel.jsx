import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import "./vehicleModel.css";
import vehicleStore from "../../stores/VehicleStore";
import VehicleModelModal from "./VehicleModelModal";
import PaginationButton from "../PaginationButton/PaginationButton";
import { fetchMoreModels } from "../../utils/functions/helperMethods";
import vehicleMakeService from "../../services/VehicleMakeService";

const VehicleModelList = () => {
  const [selectedSort, setSelectedSort] = useState("asc");
  const [selectedMakeId, setSelectedMakeId] = useState("");

  useEffect(() => {
    vehicleStore.resetPageLimit();
    vehicleStore.changePage("models");
    vehicleStore.fetchVehicleModels();
    vehicleStore.fetchVehicleMakes();
  }, []);

  const handleChangeSort = (e) => {
    const sort = e.target.value;
    setSelectedSort(sort);

    vehicleStore.fetchVehicleModels(selectedMakeId, sort);
  };

  const handleChangeFilter = (e) => {
    const makeId = e.target.value;
    setSelectedMakeId(makeId);

    vehicleStore.fetchVehicleModels(makeId, selectedSort);
  };

  const style = {
    color: "rgb(101 103 107)",
  };

  return (
    <div className='vehicle-model-list'>
      <div className='toolbar'>
        <div>
          <label htmlFor=''>
            <i className='fa-solid fa-filter' style={style}></i>
          </label>
          <select name='filterByMake' onChange={handleChangeFilter}>
            <option value=''>All makes</option>
            {vehicleStore.vehicleMakes.map((vehicle) => (
              <option name={vehicle.name} value={vehicle.id} key={vehicle.id}>
                {vehicle.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label htmlFor='orderBy'>
            {selectedSort === "asc" ? (
              <i className='fa-solid fa-arrow-down-a-z' style={style}></i>
            ) : (
              <i className='fa-solid fa-arrow-down-z-a' style={style}></i>
            )}
          </label>
          <select name='orderBy' onChange={handleChangeSort}>
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </div>
      </div>
      <ul className='model-list'>
        {vehicleStore.vehicleModels.map((vehicle) => (
          <li key={vehicle.id}>
            <VehicleModelModal vehicle={vehicle}></VehicleModelModal>
          </li>
        ))}
      </ul>
      {vehicleStore.vehicleModels.length !== 0 && (
        <PaginationButton
          fetch={() =>
            fetchMoreModels(selectedMakeId, selectedSort)
          }></PaginationButton>
      )}
    </div>
  );
};

export default observer(VehicleModelList);
