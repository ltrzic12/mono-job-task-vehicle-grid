import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import vehicleMakeStore from "../../stores/VehicleMakeStore";
import VehicleMake from "./VehicleMake";
import "./vehicleMakeList.css";
import form from "../../stores/FormStore";

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
                <VehicleMake vehicleMake={vehicleMake}></VehicleMake>
              </li>
            ))}
          </ul>
        )}
      </div>
      <div className='pagination'>
        {Array.from({
          length: Math.ceil(form.totalItems / form.itemsPerPage),
        }).map((_, index) => (
          <button
            key={index}
            className={form.currentPage === index + 1 ? "active" : ""}
            onClick={() => form.setPage(index + 1)}>
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default observer(VehicleMakeList);
