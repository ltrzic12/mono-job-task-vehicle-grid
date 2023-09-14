import { observer } from "mobx-react";

const VehicleMake = ({ vehicleMake }) => {
  return (
    <div>
      <h3>{vehicleMake.name}</h3>
    </div>
  );
};

export default observer(VehicleMake);
