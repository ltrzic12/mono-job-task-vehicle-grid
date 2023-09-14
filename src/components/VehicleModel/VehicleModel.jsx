import { observer } from "mobx-react";

const VehicleModel = ({ vehicle }) => {
  return (
    <li key={vehicle.id}>
      <div>
        <h2>{vehicle.name}</h2>
        <span>{vehicle.makeId}</span>
      </div>
    </li>
  );
};

export default observer(VehicleModel);
