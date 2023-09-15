import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import vehicleMakeStore from "../../stores/VehicleMakeStore";
import vehicleMakeService from "../../services/VehicleMakeService";
import VehicleMake from "./VehicleMake";
import "./vehicleMakeList.css";

const VehicleMakeList = () => {
  useEffect(() => {
    vehicleMakeStore.fetchVehicleMakes();
  }, []);

  const handleChangeSort = (e) => {
    const sort = e.target.value;

    vehicleMakeStore.fetchVehicleMakes(sort); // Pass makeId and sort for filtering and sorting
  };

  return (
    <div>
      {" "}
      <div className='toolbar'>
        <select name='orderBy' onChange={handleChangeSort}>
          <option value=''>Sort by</option>
          <option value='asc'>Ascending</option>
          <option value='desc'>Descending</option>
        </select>
      </div>
      <div>
        {vehicleMakeStore.isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul className='make-list'>
            {vehicleMakeStore.vehicleMakes.map((vehicleMake) => (
              <li key={vehicleMake.id}>
                <VehicleMake vehicleMake={vehicleMake}></VehicleMake>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default observer(VehicleMakeList);
