import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import vehicleMakeStore from "../../stores/VehicleMakeStore";
import VehicleMakeModul from "./VehicleMakeModul";
import "./vehicleMake.css";

const VehicleMakeList = () => {
  useEffect(() => {
    vehicleMakeStore.fetchVehicleMakes();
  }, []);

  const handleChangeSort = (e) => {
    const sort = e.target.value;

    vehicleMakeStore.fetchVehicleMakes(sort);
  };

  return (
    <div>
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
