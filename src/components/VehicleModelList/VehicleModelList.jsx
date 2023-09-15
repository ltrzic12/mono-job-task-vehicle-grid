import { useEffect, useState } from "react";
import vehicleModelStore from "../../stores/VehicleModelStore";
import { observer } from "mobx-react";
import VehicleModel from "./VehicleModel";
import "./vehicleModelList.css";
import vehicleMakeStore from "../../stores/VehicleStore";

const VehicleModelList = () => {
  const [selectedSort, setSelectedSort] = useState(""); // State to hold the selected sorting option
  const [selectedMakeId, setSelectedMakeId] = useState(""); // State to hold the selected makeId for filtering

  useEffect(() => {
    // Fetch vehicle models initially without sorting or filtering
    vehicleModelStore.fetchVehicleModels();
    vehicleMakeStore.fetchVehicleMakes();
  }, []);

  const handleChangeSort = (e) => {
    const sort = e.target.value;
    setSelectedSort(sort); // Update the selected sorting option
    vehicleModelStore.fetchVehicleModels(selectedMakeId, sort); // Pass makeId and sort for filtering and sorting
  };

  const handleChangeFilter = (e) => {
    const makeId = e.target.value;
    setSelectedMakeId(makeId); // Update the selected makeId for filtering
    vehicleModelStore.fetchVehicleModels(makeId, selectedSort); // Pass makeId and sort for filtering and sorting
  };

  return (
    <div>
      <div className='toolbar'>
        <select name='filterByMake' onChange={handleChangeFilter}>
          <option value=''>All makes</option>
          {vehicleMakeStore.vehicleMakes.map((vehicle) => (
            <option name={vehicle.name} value={vehicle.id} key={vehicle.id}>
              {vehicle.name}
            </option>
          ))}
        </select>
        <select name='orderBy' onChange={handleChangeSort}>
          <option value=''>Sort by</option>
          <option value='asc'>Ascending</option>
          <option value='desc'>Descending</option>
        </select>
      </div>
      <ul className='model-list'>
        {vehicleModelStore.vehicleModels.map((vehicle) => (
          <li key={vehicle.id}>
            <VehicleModel vehicle={vehicle}></VehicleModel>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default observer(VehicleModelList);
