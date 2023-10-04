import { observer } from "mobx-react";
import "./vehicleModelModal.css";
import vehicleModelService from "../../services/VehicleModelService";
import { useState } from "react";
import form from "../../stores/FormStore";
import { linkStyle } from "../../utils/mics/styles";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import vehicleMakeStore from "../../stores/VehicleMakeStore";

const VehicleModelModal = ({ vehicle }) => {
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
          <i className='fa-solid fa-gear fa-lg'></i>
        </div>
      ) : (
        <div className='edit-menu' onMouseLeave={handleOptionsClick}>
          <EditButton
            path={"/form/edit-model"}
            func={handleEditModelClick}
            id={vehicle.makeId}
            style={linkStyle}></EditButton>

          <DeleteButton
            id={vehicle.id}
            func={vehicleModelService.deleteVehicleModel}></DeleteButton>
        </div>
      )}
    </div>
  );
};

export default observer(VehicleModelModal);
