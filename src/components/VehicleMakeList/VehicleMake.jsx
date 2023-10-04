import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import "./vehicleMake.css";
import vehicleStore from "../../stores/VehicleStore";
import VehicleMakeModal from "./VehicleMakeModal";

import Loader from "../Loader/Loader";

const VehicleMakeList = () => {
  useEffect(() => {
    const fetchData = async () => {
      await vehicleStore.changePage("makes");
      await vehicleStore.fetchVehicleMakes();
    };
    fetchData();
  }, []);

  const handleChangeFilter = async (e) => {
    const filter = e.target.value;

    vehicleStore.changeSelectedSort(filter);
    await vehicleStore.fetchVehicleMakes();
  };

  const handleChangeDirection = async (e) => {
    const sort = e.target.value;

    if (sort === true) {
      vehicleStore.changeSelectedSort(true);
    } else {
      vehicleStore.changeSelectedSort(false);
    }
    await vehicleStore.fetchVehicleMakes();
  };

  const style = {
    color: "rgb(101 103 107)",
  };

  return (
    <div>
      <div className='toolbar'>
        <div>
          <label htmlFor='sort'>
            <i className='fa-solid fa-filter' style={style}></i>
          </label>
          <select name='orderBy' onChange={handleChangeFilter}>
            <option value='name'>Name</option>
            <option value='created_at'>Time</option>
          </select>
        </div>
        <label htmlFor='orderBy'>
          {vehicleStore.ascending === true ? (
            <i className='fa-solid fa-arrow-down-a-z' style={style}></i>
          ) : (
            <i className='fa-solid fa-arrow-down-z-a' style={style}></i>
          )}
        </label>
        <select name='sort' onChange={handleChangeDirection}>
          <option value='true'>Ascending</option>
          <option value='false'>Descending</option>
        </select>
      </div>
      <div className='list-wrap'>
        {vehicleStore.isLoading ? (
          <Loader></Loader>
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
