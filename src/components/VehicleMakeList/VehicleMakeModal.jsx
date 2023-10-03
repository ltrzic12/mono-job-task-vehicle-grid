import { observer } from "mobx-react";
import "./vehicleMakeModal.css";
import vehicleMakeService from "../../services/VehicleMakeService";
import form from "../../stores/FormStore";
import { useState } from "react";
import { linkStyle } from "../../utils/mics/styles";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import vehicleModelService from "../../services/VehicleModelService";

const VehicleMakeModal = ({ vehicleMake }) => {
  const [isOptionsOpened, setIsOptionsOpened] = useState(false);

  const handleOptionsClick = () => {
    setIsOptionsOpened(!isOptionsOpened);
  };
  const handleEditMakeClick = () => {
    form.setFormType("edit make");
    form.setMakeId(vehicleMake.id);
    form.populateFormData(vehicleMake.name, vehicleMake.abrv, vehicleMake.id);
  };

  return (
    <div className='vehicle-make-item'>
      <h1 className='uppercase'>{vehicleMake.name}</h1>
      {!isOptionsOpened ? (
        <div className='edit' onClick={handleOptionsClick}>
          <i className='fa-solid fa-gear fa-lg'></i>
        </div>
      ) : (
        <div className='edit-menu' onMouseLeave={handleOptionsClick}>
          <EditButton
            path={"/form/edit-make"}
            func={handleEditMakeClick}
            style={linkStyle}></EditButton>

          <DeleteButton
            id={vehicleMake.id}
            func={vehicleMakeService.deleteVehicleMake}
            func2={
              vehicleModelService.deleteVehicleModelsByMakeId
            }></DeleteButton>
        </div>
      )}
    </div>
  );
};

export default observer(VehicleMakeModal);
