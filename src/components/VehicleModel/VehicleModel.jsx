import { observer } from "mobx-react";
import "./vehicleModel.css";
import editModelFormStore from "../../stores/EditModelFormStore";
import vehicleModelService from "../../services/VehicleModelService";
import editStore from "../../stores/EditStore";
import EditModelForm from "../Forms/EditModelForm";

const VehicleModel = ({ vehicle }) => {
  const handleOptionsClick = () => {
    editStore.toggleEditClick();
  };
  const handleEditClick = () => {
    editModelFormStore.toggleIsOpened();
  };
  return (
    <div>
      {!editModelFormStore.isOpened ? (
        <div className='vehicle-model-item'>
          <h2>{vehicle.name}</h2>
          <span>{vehicle.makeId}</span>

          {!editStore.isEditClicked ? (
            <div className='edit' onClick={handleOptionsClick}></div>
          ) : (
            <div className='edit-menu'>
              <button
                onClick={() =>
                  vehicleModelService.deleteVehicleModel(vehicle.id)
                }>
                Delete model
              </button>
              <button onClick={handleEditClick}>Edit model</button>
              <button onClick={handleOptionsClick}>Close</button>
            </div>
          )}
        </div>
      ) : (
        <div>
          <EditModelForm></EditModelForm>
        </div>
      )}
    </div>
  );
};

export default observer(VehicleModel);
