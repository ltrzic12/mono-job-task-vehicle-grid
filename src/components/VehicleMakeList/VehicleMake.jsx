import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import "./vehicleMake.css";
import VehicleMakeModal from "./VehicleMakeModal";
import Loader from "../Loader/Loader";
import PaginationButton from "../PaginationButton/PaginationButton";
import vehicleMakeService from "../../services/VehicleMakeService";
import vehicleMakeStore from "../../stores/VehicleMakeStore";

const VehicleMakeList = () => {
  useEffect(() => {
    const fetchData = async () => {
      vehicleMakeStore.resetAllFilters();
      await vehicleMakeService.fetchVehicleMakes();
    };
    fetchData();
  }, []);

  const handleChangeFilter = async (e) => {
    const filter = e.target.value;

    vehicleMakeStore.changeSelectedSort(filter);
    await vehicleMakeService.fetchVehicleMakes();
  };

  const handleChangeDirection = async (e) => {
    const sort = e.target.value === "true";
    vehicleMakeStore.changeSelectedDirection(sort);
    await vehicleMakeService.fetchVehicleMakes();
  };

  const style = {
    color: "rgb(101 103 107)",
  };

  return (
    <div>
      <div className='toolbar'>
        <div>
          <label htmlFor='filter'>
            <i className='fa-solid fa-filter' style={style}></i>
          </label>
          <select name='filter' onChange={handleChangeFilter}>
            <option value='name'>Name</option>
            <option value='created_at'>Time added</option>
          </select>
        </div>
        <div>
          <label htmlFor='orderBy'>
            {vehicleMakeStore.ascending === true ? (
              <i className='fa-solid fa-arrow-down-a-z' style={style}></i>
            ) : (
              <i className='fa-solid fa-arrow-down-z-a' style={style}></i>
            )}
          </label>
          <select name='orderBy' onChange={handleChangeDirection}>
            <option value='true'>Ascending</option>
            <option value='false'>Descending</option>
          </select>
        </div>
      </div>
      <div className='list-wrap'>
        {vehicleMakeStore.isLoading ? (
          <Loader></Loader>
        ) : (
          <ul className='make-list'>
            {vehicleMakeStore.vehicleMakes.map((vehicleMake) => (
              <li key={vehicleMake.id}>
                <VehicleMakeModal vehicleMake={vehicleMake}></VehicleMakeModal>
              </li>
            ))}
          </ul>
        )}
      </div>
      <PaginationButton
        next={vehicleMakeService.fetchNextPage}
        prev={vehicleMakeService.fetchPreviousPage}
        endAt={vehicleMakeStore.endAt}
        limit={vehicleMakeStore.totalNumberOfData}
        startAt={vehicleMakeStore.startAt}></PaginationButton>
    </div>
  );
};

export default observer(VehicleMakeList);
