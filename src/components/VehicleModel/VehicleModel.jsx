import { observer } from "mobx-react";
import "./vehicleModel.css";
import vehicleMakeStore from "../../stores/VehicleStore";
import vehicleModelService from "../../services/VehicleModelService";
const VehicleModel = ({ vehicle }) => {
  return (
    <div className='vehicle-model-item'>
      <h2>{vehicle.name}</h2>
      <span>{vehicle.makeId}</span>
      <button
        onClick={() => vehicleModelService.deleteVehicleModel(vehicle.id)}>
        Delete model
      </button>
    </div>
  );
};

export default observer(VehicleModel);
