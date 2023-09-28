import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import "./vehicleMake.css";
import vehicleStore from "../../stores/VehicleStore";
import VehicleMakeModal from "./VehicleMakeModal";
import PaginationButton from "../PaginationButton/PaginationButton";
import { fetchMoreMakes } from "../../utils/functions/helperMethods";
import Loader from "../Loader/Loader";

const VehicleMakeList = () => {
  const [selectedSort, setSelectedSort] = useState("asc");

  useEffect(() => {
    vehicleStore.resetPageLimit();
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
      <PaginationButton
        fetch={() => fetchMoreMakes(selectedSort)}></PaginationButton>
    </div>
  );
};

export default observer(VehicleMakeList);
