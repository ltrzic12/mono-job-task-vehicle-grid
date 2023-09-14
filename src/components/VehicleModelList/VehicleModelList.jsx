import { useEffect } from "react";
import vehicleModelStore from "../../stores/VehicleModelStore";
import { observer } from "mobx-react";
import VehicleModel from "../VehicleModel/VehicleModel";
import "./vehicleModelList.css";
const VehicleModelList = () => {
  useEffect(() => {
    vehicleModelStore.fetchVehicleModels();
  }, []);
  return (
    <ul className='model-list'>
      {vehicleModelStore.vehicleModels.map((vehicle) => (
        <li key={vehicle.id}>
          <VehicleModel vehicle={vehicle}></VehicleModel>
        </li>
      ))}
    </ul>
  );
};

export default observer(VehicleModelList);
