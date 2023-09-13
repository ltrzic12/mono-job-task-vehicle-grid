import { observer } from "mobx-react-lite";
import { useEffect } from "react";
import vehicleMakeStore from "../../stores/VehicleStore";
import vehicleMakeService from "../../services/VehicleMakeService";

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
            <li key={vehicleMake.name}>
              {vehicleMake.name}
              <button
                onClick={() =>
                  vehicleMakeService.deleteVehicleMake(vehicleMake.id)
                }>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default observer(VehicleMakeList);
