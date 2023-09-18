import { observer } from "mobx-react";
import "./vehicleModel.css";
import vehicleModelService from "../../services/VehicleModelService";
import vehicleMakeStore from "../../stores/VehicleMakeStore";
import { useState } from "react";
import form from "../../stores/FormStore";
import { Link } from "react-router-dom";

const VehicleModel = ({ vehicle }) => {
  const [isOptionsOpened, setIsOptionsOpened] = useState(false);

  const handleOptionsClick = () => {
    setIsOptionsOpened(!isOptionsOpened);
  };

  const getVehicleMakerName = (makeId) => {
    const maker = vehicleMakeStore.vehicleMakes.find(
      (maker) => maker.id === makeId,
    );
    return maker ? maker.name : "Unknown Maker";
  };

  const handleEditModelClick = (makeId) => {
    console.log(makeId);
    form.setFormType("edit model");
    form.setEditModelId(vehicle.id);
    form.populateFormData(vehicle.name, vehicle.abrv, makeId);
  };

  return (
    <div className='vehicle-model-item'>
      <h2>{vehicle.name}</h2>
      <span>{getVehicleMakerName(vehicle.makeId)}</span>

      {!isOptionsOpened ? (
        <div className='edit' onClick={handleOptionsClick}></div>
      ) : (
        <div className='edit-menu' onMouseLeave={handleOptionsClick}>
          <button
            onClick={() => vehicleModelService.deleteVehicleModel(vehicle.id)}>
            Delete model
          </button>
          <Link to='/form/edit' onClick={handleEditModelClick(vehicle.makeId)}>
            Edit model
          </Link>
          <button onClick={handleOptionsClick}>Close</button>
        </div>
      )}
    </div>
  );
};

export default observer(VehicleModel);
