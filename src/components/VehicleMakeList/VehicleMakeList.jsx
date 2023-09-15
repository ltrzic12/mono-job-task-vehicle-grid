import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import vehicleMakeStore from "../../stores/VehicleStore";
import vehicleMakeService from "../../services/VehicleMakeService";
import VehicleMake from "./VehicleMake";
import "./vehicleMakeList.css";
const VehicleMakeList = () => {
  useEffect(() => {
    vehicleMakeStore.fetchVehicleMakes();
  }, []);

  return (
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
  );
};

export default observer(VehicleMakeList);
