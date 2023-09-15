import { observer } from "mobx-react";
import "./vehicleModel.css";
import vehicleModelService from "../../services/VehicleModelService";
import vehicleMakeStore from "../../stores/VehicleStore";
import { useState } from "react";

const VehicleModel = ({ vehicle }) => {
  const [isOptionsOpened, setIsOptionsOpened] = useState(false);
  const [isEditOpened, setIsEditOpened] = useState(false);

  const handleOptionsClick = () => {
    setIsOptionsOpened(!isOptionsOpened);
  };

  const getVehicleMakerName = (makeId) => {
    const maker = vehicleMakeStore.vehicleMakes.find(
      (maker) => maker.id === makeId,
    );
    return maker ? maker.name : "Unknown Maker";
  };

  return (
    <div>
      {!isEditOpened ? (
        <div className='vehicle-model-item'>
          <h2>{vehicle.name}</h2>
          <span>{getVehicleMakerName(vehicle.makeId)}</span>

          {!isOptionsOpened ? (
            <div className='edit' onClick={handleOptionsClick}></div>
          ) : (
            <div className='edit-menu' onMouseLeave={handleOptionsClick}>
              <button
                onClick={() =>
                  vehicleModelService.deleteVehicleModel(vehicle.id)
                }>
                Delete model
              </button>
              <button>Edit model</button>
              <button onClick={handleOptionsClick}>Close</button>
            </div>
          )}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default observer(VehicleModel);
