import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import vehicleMakeStore from "../../../stores/VehicleStore";

const VehicleMakeList = () => {
  useEffect(() => {
    vehicleMakeStore.fetchVehicleMakes();
  }, []);

  return (
    <div>
      {vehicleMakeStore.isLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {vehicleMakeStore.vehicleMakes.map((vehicleMake) => (
            <li key={vehicleMake.id}>{vehicleMake.name}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default observer(VehicleMakeList);
