import { useEffect, useState } from "react";
import vehicleModelStore from "../../stores/VehicleModelStore";
import { observer } from "mobx-react";
import VehicleModel from "./VehicleModel";
import "./vehicleModelList.css";
import vehicleMakeStore from "../../stores/VehicleMakeStore";

const VehicleModelList = () => {
  const [selectedSort, setSelectedSort] = useState("");
  const [selectedMakeId, setSelectedMakeId] = useState("");

  useEffect(() => {
    vehicleModelStore.fetchVehicleModels();
    vehicleMakeStore.fetchVehicleMakes();
  }, []);

  const handleChangeSort = (e) => {
    const sort = e.target.value;
    setSelectedSort(sort);
    vehicleModelStore.fetchVehicleModels(selectedMakeId, sort);
  };

  const handleChangeFilter = (e) => {
    const makeId = e.target.value;
    setSelectedMakeId(makeId);
    vehicleModelStore.fetchVehicleModels(makeId, selectedSort);
  };

  return (
    <div className='vehicle-model-list'>
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
