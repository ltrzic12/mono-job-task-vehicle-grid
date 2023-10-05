import { useEffect } from "react";
import { observer } from "mobx-react";
import "./vehicleModel.css";
import VehicleModelModal from "./VehicleModelModal";
import PaginationButton from "../PaginationButton/PaginationButton";
import Loader from "../Loader/Loader";
import vehicleMakeService from "../../services/VehicleMakeService";
import vehicleModelService from "../../services/VehicleModelService";
import vehicleModelStore from "../../stores/VehicleModelStore";
import vehicleMakeStore from "../../stores/VehicleMakeStore";

const VehicleModelList = () => {
  useEffect(() => {
    vehicleMakeStore.setPageType("models");
    vehicleModelStore.resetAllFilters();
    const fetchData = async () => {
      await vehicleModelService.fetchVehicleModels();
      await vehicleMakeService.fetchVehicleMakes();
    };
    fetchData();
  }, []);

  const handleChangeDirection = async (e) => {
    const sort = e.target.value === "true";
    vehicleModelStore.changeSelectedDirection(sort);
    await vehicleModelService.fetchVehicleModels();
    await vehicleModelService.calculateNumberOfData();
  };

  const handleChangeFilter = async (e) => {
    const filter = e.target.value;
    vehicleModelStore.changeSelectedSort(filter);
    await vehicleModelService.fetchVehicleModels();
    await vehicleModelService.calculateNumberOfData();
  };

  const handleFilterByMakeId = async (e) => {
    const makeID = e.target.value;
    vehicleModelStore.resetPageIndex();
    await vehicleModelStore.changeSelectedMakeID(makeID);
    await vehicleModelService.fetchVehicleModels();
  };

  const style = {
    color: "rgb(101 103 107)",
  };

  return (
    <div className='vehicle-model-list'>
      <div className='toolbar'>
        <div>
          <label htmlFor='filter'>
            <i className='fa-solid fa-filter' style={style}></i>
          </label>
          <select name='filter' id='filter' onChange={handleChangeFilter}>
            <option value='name'>Name</option>
            <option value='created_at'>Time added</option>
          </select>
        </div>
        <div>
          <label htmlFor='filterByMakeId'>
            <i className='fa-solid fa-car' style={style}></i>
          </label>
          <select
            name='filterByMakeId'
            id='filterByMakeId'
            onChange={handleFilterByMakeId}>
            <option value=''>All</option>
            {vehicleMakeStore.vehicleMakes.map((make) => {
              return (
                <option value={make.id} key={make.id}>
                  {make.name}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label htmlFor='orderBy'>
            {vehicleModelStore.ascending === true ? (
              <i className='fa-solid fa-arrow-down-a-z' style={style}></i>
            ) : (
              <i className='fa-solid fa-arrow-down-z-a' style={style}></i>
            )}
          </label>
          <select name='orderBy' id='orderBy' onChange={handleChangeDirection}>
            <option value='true'>Ascending</option>
            <option value='false'>Descending</option>
          </select>
        </div>
      </div>

      <div className='list-wrap'>
        {vehicleModelStore.isLoading ? (
          <Loader></Loader>
        ) : (
          <ul className='model-list'>
            {vehicleModelStore.vehicleModels.map((vehicle) => (
              <li key={vehicle.id}>
                <VehicleModelModal vehicle={vehicle}></VehicleModelModal>
              </li>
            ))}
          </ul>
        )}
      </div>

      <PaginationButton
        next={vehicleModelService.fetchNextPage}
        prev={vehicleModelService.fetchPreviousPage}
        endAt={vehicleModelStore.endAt}
        limit={vehicleModelStore.totalNumberOfData}
        startAt={vehicleModelStore.startAt}
        currentPage={vehicleModelStore.currentPage}
        setPage={vehicleModelService.setPage}
        pageSize={vehicleModelStore.pageSize}></PaginationButton>
    </div>
  );
};

export default observer(VehicleModelList);
