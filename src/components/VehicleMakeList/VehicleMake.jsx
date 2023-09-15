import { observer } from "mobx-react";
import "./vehicleMake.css";
const VehicleMake = ({ vehicleMake }) => {
  return (
    <div className='vehicle-make-item'>
      <h3>{vehicleMake.name}</h3>
    </div>
  );
};

export default observer(VehicleMake);
