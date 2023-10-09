import { observer } from "mobx-react";
import "./vehicleModelModal.css";
import vehicleModelService from "../../services/VehicleModelService";
import { useState } from "react";
import { linkStyle } from "../../utils/mics/styles";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import vehicleMakeStore from "../../stores/VehicleMakeStore";
import { editModelForm } from "../../stores/form/EditModelStore";

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

  const handleEditModelClick = (id, makeId) => {
    editModelForm.setMakeID(makeId);
    editModelForm.setModelID(id);
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
            makeID={vehicle.makeId}
            ID={vehicle.id}
            style={linkStyle}
            func={handleEditModelClick}></EditButton>

          <DeleteButton
            id={vehicle.id}
            func={vehicleModelService.deleteVehicleModel}></DeleteButton>
        </div>
      )}
    </div>
  );
};

export default observer(VehicleModelModal);
