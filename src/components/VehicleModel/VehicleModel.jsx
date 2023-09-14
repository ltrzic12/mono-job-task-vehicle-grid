import { observer } from "mobx-react";
import "./vehicleModel.css";
const VehicleModel = ({ vehicle }) => {
  return (
    <div className='vehicle-model-item'>
      <h2>{vehicle.name}</h2>
      <span>{vehicle.makeId}</span>
    </div>
  );
};

export default observer(VehicleModel);
