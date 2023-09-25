import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import "./vehicleMake.css";
import vehicleStore from "../../stores/VehicleStore";
import VehicleMakeModal from "./VehicleMakeModal";

const VehicleMakeList = () => {
  const [selectedSort, setSelectedSort] = useState("asc");

  useEffect(() => {
    vehicleStore.fetchVehicleMakes();
  }, []);

  const handleChangeSort = (e) => {
    const sort = e.target.value;
    setSelectedSort(sort);

    vehicleStore.fetchVehicleMakes(sort);
  };

  const style = {
    color: "rgb(101 103 107)",
  };

  return (
    <div>
      <div className='toolbar'>
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
      <div>
        {vehicleStore.isLoading ? (
          <p>Loading...</p>
        ) : (
          <ul className='make-list'>
            {vehicleStore.vehicleMakes.map((vehicleMake) => (
              <li key={vehicleMake.id}>
                <VehicleMakeModal vehicleMake={vehicleMake}></VehicleMakeModal>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default observer(VehicleMakeList);
