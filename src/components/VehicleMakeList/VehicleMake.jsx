import { observer } from "mobx-react";
import "./vehicleMake.css";
const VehicleMake = ({ vehicleMake }) => {
  return (
    <div className='vehicle-make-item'>
      <h1>{vehicleMake.name}</h1>
    </div>
  );
};

export default observer(VehicleMake);
