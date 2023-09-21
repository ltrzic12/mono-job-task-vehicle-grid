import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import VehicleMakeModul from "./VehicleMakeModul";
import "./vehicleMake.css";
import vehicleStore from "../../stores/VehicleStore";

const VehicleMakeList = () => {
  const [sort, setSort] = useState("asc");

  useEffect(() => {
    vehicleStore.fetchVehicleMakes();
  }, []);

  const handleChangeSort = (e) => {
    const sort = e.target.value;
    setSort(sort);

    vehicleStore.fetchVehicleMakes(sort);
  };

  return (
    <div>
      <div className='toolbar'>
        <div>
          <label htmlFor=''>
            <i className='fa-solid fa-filter'></i>
          </label>
          <select name='orderBy' onChange={handleChangeSort}>
            <option value=''>Sort by</option>
            <option value='asc'>Ascending</option>
            <option value='desc'>Descending</option>
          </select>
        </div>
      </div>
      <div>
        {vehicleStore.isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul className='make-list'>
            {vehicleStore.vehicleMakes.map((vehicleMake) => (
              <li key={vehicleMake.id}>
                <VehicleMakeModul vehicleMake={vehicleMake}></VehicleMakeModul>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default observer(VehicleMakeList);
