import { observer } from "mobx-react";
import "./vehicleMakeModal.css";
import vehicleMakeService from "../../services/VehicleMakeService";
import { useState } from "react";
import { linkStyle } from "../../utils/mics/styles";
import DeleteButton from "../DeleteButton/DeleteButton";
import EditButton from "../EditButton/EditButton";
import vehicleModelService from "../../services/VehicleModelService";
import { editMakeForm } from "../../stores/form/EditMakeStore";

const VehicleMakeModal = ({ vehicleMake }) => {
  const [isOptionsOpened, setIsOptionsOpened] = useState(false);

  const handleOptionsClick = () => {
    setIsOptionsOpened(!isOptionsOpened);
  };
  const handleEditMakeClick = (id) => {
    editMakeForm.setMakeID(id);
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
            ID={vehicleMake.id}
            style={linkStyle}></EditButton>

          <DeleteButton
            ID={vehicleMake.id}
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
