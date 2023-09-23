import { observer } from "mobx-react";
import "./vehicleModelModul.css";
import vehicleModelService from "../../services/VehicleModelService";
import { useState } from "react";
import form from "../../stores/FormStore";
import { Link } from "react-router-dom";
import vehicleStore from "../../stores/VehicleStore";
import { linkStyle } from "../../utils/mics/styles";
import vehicleMakeService from "../../services/VehicleMakeService";

const VehicleModel = ({ vehicle }) => {
  const [isOptionsOpened, setIsOptionsOpened] = useState(false);

  const handleOptionsClick = () => {
    setIsOptionsOpened(!isOptionsOpened);
  };

  const getVehicleMakerName = (makeId) => {
    const maker = vehicleStore.vehicleMakes.find(
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
        <div className='edit-model' onClick={handleOptionsClick}>
          asd
        </div>
      ) : (
        <div className='edit-menu' onMouseLeave={handleOptionsClick}>
          <button>
            <Link
              to='/form/edit-model'
              onClick={handleEditModelClick(vehicle.makeId)}
              className='link'
              style={linkStyle}>
              <i className='fa-solid fa-pen-to-square'></i>
            </Link>
          </button>
          <button
            onClick={() => vehicleModelService.deleteVehicleModel(vehicle.id)}>
            <i className='fa-solid fa-trash'></i>
          </button>
        </div>
      )}
    </div>
  );
};

export default observer(VehicleModel);
