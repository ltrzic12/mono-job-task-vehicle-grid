import { useEffect } from "react";
import vehicleModelStore from "../../stores/VehicleModelStore";
import { observer } from "mobx-react";
import VehicleModel from "../VehicleModel/VehicleModel";

const VehicleModelList = () => {
  useEffect(() => {
    vehicleModelStore.fetchVehicleModels();
  }, []);
  return (
    <ul>
      {vehicleModelStore.vehicleModels.map((vehicle) => (
        <VehicleModel vehicle={vehicle} key={vehicle.id}></VehicleModel>
      ))}
    </ul>
  );
};

export default observer(VehicleModelList);
