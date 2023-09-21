import { useEffect, useState } from "react";
import { observer } from "mobx-react";
import "./vehicleModel.css";
import VehicleModelModul from "./VehicleModelModul";
import vehicleStore from "../../stores/VehicleStore";

const VehicleModelList = () => {
  const [selectedSort, setSelectedSort] = useState("asc");
  const [selectedMakeId, setSelectedMakeId] = useState("");

  useEffect(() => {
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

  return (
    <div className='vehicle-model-list'>
      <div className='toolbar'>
        <div>
          <label htmlFor=''>
            <i className='fa-solid fa-filter'></i>
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
              <i className='fa-solid fa-arrow-down-a-z'></i>
            ) : (
              <i className='fa-solid fa-arrow-down-z-a'></i>
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
            <VehicleModelModul vehicle={vehicle}></VehicleModelModul>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default observer(VehicleModelList);
